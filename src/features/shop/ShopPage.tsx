"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link, Navigate, useNavigate } from "@/lib/navigation";
import { SHOP_PRODUCTS, getShopProduct } from "@/data/products";
import { formatCurrency, getCartLines, getEstimatedShipping, getSubtotal } from "@/lib/cart";
import { useCart } from "@/contexts/CartContext";
import { usePageMeta } from "@/hooks/usePageMeta";
import Footer from "@/components/layout/Footer";
import ProductCard from "./ProductCard";
import {
  clearCurrentAccount,
  getAccountOrders,
  getCurrentAccount,
  saveOrderForCurrentAccount,
  setCurrentAccount,
  type LocalOrder,
} from "./accountStorage";

type CheckoutData = {
  email: string;
  phone: string;
  fullName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

type CheckoutField = {
  name: keyof CheckoutData;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "email" | "tel" | "text" | "numeric";
};

const EMPTY_CHECKOUT_DATA: CheckoutData = {
  email: "",
  phone: "",
  fullName: "",
  address: "",
  city: "",
  country: "",
  postalCode: "",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

const EMPTY_LOGIN_DATA = {
  identifier: "",
  password: "",
};

const EMPTY_REGISTER_DATA = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  country: "Bulgaria",
  newsletter: false,
};

const CONTACT_FIELDS: CheckoutField[] = [
  {
    name: "email",
    label: "Email address",
    placeholder: "name@example.com",
    type: "email",
    autoComplete: "email",
    inputMode: "email",
  },
  {
    name: "phone",
    label: "Phone number",
    placeholder: "+359 88 000 0000",
    type: "tel",
    autoComplete: "tel",
    inputMode: "tel",
  },
];

const BILLING_FIELDS: CheckoutField[] = [
  { name: "fullName", label: "Full name", placeholder: "Full legal name", autoComplete: "name" },
  {
    name: "address",
    label: "Address",
    placeholder: "Street and number",
    autoComplete: "street-address",
  },
  { name: "city", label: "City", placeholder: "City", autoComplete: "address-level2" },
  { name: "country", label: "Country", placeholder: "Country", autoComplete: "country-name" },
  {
    name: "postalCode",
    label: "Postal code",
    placeholder: "Postal code",
    autoComplete: "postal-code",
    inputMode: "text",
  },
];

const PAYMENT_FIELDS: CheckoutField[] = [
  {
    name: "cardName",
    label: "Name on card",
    placeholder: "Cardholder name",
    autoComplete: "cc-name",
  },
  {
    name: "cardNumber",
    label: "Card number",
    placeholder: "4242 4242 4242 4242",
    autoComplete: "cc-number",
    inputMode: "numeric",
  },
  {
    name: "expiry",
    label: "Expiry",
    placeholder: "MM/YY",
    autoComplete: "cc-exp",
    inputMode: "numeric",
  },
  {
    name: "cvc",
    label: "Security code",
    placeholder: "CVC",
    autoComplete: "cc-csc",
    inputMode: "numeric",
  },
];

const SHOP_LANDING_PRODUCTS = SHOP_PRODUCTS.filter((product) => product.slug !== "merchandise");
const LIVE_RENT_TO_OWN_OPTION = "Suite (Rent-to-own)";
const LIVE_RENT_TO_OWN_MONTHS = 24;
const isRentToOwnOption = (option?: string) => option === LIVE_RENT_TO_OWN_OPTION;
const formatLineAmount = (amount: number, option?: string) =>
  `${formatCurrency(amount)}${isRentToOwnOption(option) ? " / mo." : ""}`;
const formatLineUnit = (amount: number, option?: string) =>
  isRentToOwnOption(option) ? formatLineAmount(amount, option) : `${formatCurrency(amount)} each`;

const normalizeDigits = (value: string) => value.replace(/\D/g, "");
const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
const isFilled = (value: string) => value.trim().length > 0;
const isValidExpiry = (value: string) => /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(value.trim());

function createLocalOrder(
  lines: ReturnType<typeof getCartLines>,
  subtotal: number,
  estimated: number,
  taxEstimate: number,
  total: number
): LocalOrder {
  const now = new Date();
  const reference = `LOCAL-${now.getTime().toString(36).toUpperCase()}`;

  return {
    id: reference,
    date: now.toISOString().slice(0, 10),
    reference,
    products: lines
      .map((line) =>
        isRentToOwnOption(line.option)
          ? `${line.quantity} x ${line.product.title} (${line.option}, for ${LIVE_RENT_TO_OWN_MONTHS} months)`
          : `${line.quantity} x ${line.product.title}`
      )
      .join(", "),
    hasRentToOwn: lines.some((line) => isRentToOwnOption(line.option)),
    subtotal,
    estimated,
    taxEstimate,
    total,
    lines: lines.map((line) => ({
      title: line.product.title,
      option: line.option,
      quantity: line.quantity,
      lineTotal: line.lineTotal,
    })),
  };
}

function isCheckoutStepValid(step: number, data: CheckoutData, hasCartItems: boolean): boolean {
  if (step === 1) {
    return isValidEmail(data.email) && normalizeDigits(data.phone).length >= 7;
  }

  if (step === 2) {
    return BILLING_FIELDS.every((field) => isFilled(data[field.name]));
  }

  if (step === 3) {
    return (
      isFilled(data.cardName) &&
      normalizeDigits(data.cardNumber).length >= 12 &&
      isValidExpiry(data.expiry) &&
      normalizeDigits(data.cvc).length >= 3
    );
  }

  return hasCartItems && isCheckoutComplete(data);
}

function isCheckoutComplete(data: CheckoutData): boolean {
  return (
    isCheckoutStepValid(1, data, true) &&
    isCheckoutStepValid(2, data, true) &&
    isCheckoutStepValid(3, data, true)
  );
}

function ShopLanding() {
  usePageMeta({
    title: "Shop — Ableton Programme",
    description:
      "Browse the Ableton Programme shop: Live, Push, Move, Packs, education offers and selected merchandise as a polished portfolio buying flow.",
    canonicalPath: "/shop",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Ableton Shop",
      description: "Software, hardware and sound content for music making.",
    },
  });

  const productRailRef = useRef<HTMLDivElement>(null);
  const [railProgress, setRailProgress] = useState({ left: 0, width: 100 });

  useEffect(() => {
    const rail = productRailRef.current;
    if (!rail) return;

    let frameId = 0;
    const updateProgress = () => {
      frameId = 0;
      const maxScroll = rail.scrollWidth - rail.clientWidth;
      if (maxScroll <= 0) {
        setRailProgress({ left: 0, width: 100 });
        return;
      }

      const width = Math.max(14, (rail.clientWidth / rail.scrollWidth) * 100);
      const left = (rail.scrollLeft / maxScroll) * (100 - width);
      setRailProgress({ left, width });
    };

    const requestUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    rail.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      rail.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <main className="shop-page">
      <section className="shop-hero">
        <div>
          <h1>Shop</h1>
          <p className="shop-hero-copy">
            <span>Explore Live, Push, Move, Packs, education offers, and</span>
            <span className="shop-hero-copy-line">
              selected merchandise in a polished portfolio buying flow.
            </span>
          </p>
        </div>
        <div className="shop-hero-links">
          <Link to="/shop/cart" className="shop-text-link">
            View cart
          </Link>
          <Link to="/shop/account" className="shop-text-link">
            Account
          </Link>
        </div>
      </section>

      <section className="shop-section" id="shop-products">
        <div className="shop-section-head">
          <h2>Products</h2>
          <p>Software, hardware, and sound content for music making.</p>
        </div>
        <div className="shop-product-grid" ref={productRailRef}>
          {SHOP_LANDING_PRODUCTS.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        <div className="shop-product-scrollbar" aria-hidden="true">
          <span
            className="shop-product-scrollbar-thumb"
            style={{
              left: `${railProgress.left}%`,
              width: `${railProgress.width}%`,
            }}
          />
        </div>
      </section>

      <Footer newsletterKicker="Offers & Tutorials" />
    </main>
  );
}

function ProductDetail({ productSlug, plan }: { productSlug?: string; plan?: string }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = getShopProduct(productSlug ?? "") ?? SHOP_PRODUCTS[0];
  const isLiveRentToOwn =
    product.slug === "live-12" && plan === "rent-to-own";
  const availableOptions = isLiveRentToOwn
    ? [
        {
          label: "Intro",
          price: 79,
          disabled: true,
          note: "Rent-to-own plan not available for this license",
        },
        {
          label: "Standard",
          price: 279,
          disabled: true,
          note: "Rent-to-own plan not available for this license",
        },
        {
          label: LIVE_RENT_TO_OWN_OPTION,
          price: 24.96,
          displayLabel: "Suite",
          note: `for ${LIVE_RENT_TO_OWN_MONTHS} months`,
        },
      ]
    : (product.options ?? []).filter((item) => !item.hidden);
  const [option, setOption] = useState(
    isLiveRentToOwn ? LIVE_RENT_TO_OWN_OPTION : (availableOptions[0]?.label ?? "")
  );
  const defaultOption = isLiveRentToOwn
    ? LIVE_RENT_TO_OWN_OPTION
    : (product.options?.find((item) => !item.hidden)?.label ?? "");
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const selectedOption = product.options?.find((item) => item.label === option);
  const selectedPrice = selectedOption?.price ?? product.price;

  useEffect(() => {
    setOption(defaultOption);
    setIsOptionOpen(false);
  }, [defaultOption]);

  usePageMeta({
    title: `${product.title} — Ableton Shop`,
    description: product.detail,
    canonicalPath: `/shop/product/${product.slug}`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.title,
      description: product.detail,
      category: product.category,
      brand: { "@type": "Brand", name: "Ableton" },
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: product.price,
        availability: "https://schema.org/InStock",
      },
    },
  });

  if (product.slug === "packs") {
    return <Navigate to="/packs" replace />;
  }

  return (
    <main className="shop-product-detail">
      <section className="shop-product-hero">
        <div className="shop-product-media">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="shop-product-copy">
          <Link to="/shop" className="shop-text-link">
            Back to Shop
          </Link>
          <span className="shop-card-category">{product.category}</span>
          <h1>{product.title}</h1>
          <p>{product.detail}</p>
          <strong>
            {formatCurrency(selectedPrice)}
            {isLiveRentToOwn ? " / mo." : ""}
          </strong>
          {isLiveRentToOwn && <p>Rent-to-own for {LIVE_RENT_TO_OWN_MONTHS} months. Suite only.</p>}

          {product.options && (
            <div className="shop-field shop-option-field">
              <span>Option</span>
              <button
                type="button"
                className="shop-option-trigger"
                aria-haspopup="listbox"
                aria-expanded={isOptionOpen}
                onClick={() => setIsOptionOpen((open) => !open)}
              >
                <span>{option}</span>
                <span className="shop-option-arrow" aria-hidden="true" />
              </button>
              {isOptionOpen && (
                <div className="shop-option-menu" role="listbox" aria-label="Option">
                  {availableOptions.map((item) => (
                    <button
                      type="button"
                      role="option"
                      aria-selected={item.label === option}
                      aria-disabled={item.disabled ? "true" : undefined}
                      className={[
                        "shop-option-item",
                        item.label === option ? " is-selected" : "",
                        item.disabled ? "is-disabled" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      key={item.label}
                      disabled={item.disabled}
                      onClick={() => {
                        if (item.disabled) return;
                        setOption(item.label);
                        setIsOptionOpen(false);
                      }}
                    >
                      <span aria-hidden="true">{item.label === option ? "✓" : ""}</span>
                      <span>
                        {item.displayLabel ?? item.label}
                        {item.disabled ? (
                          <small>{item.note}</small>
                        ) : (
                          <>
                            {" "}
                            — {formatCurrency(item.price)}
                            {isLiveRentToOwn ? " / mo." : ""}
                            {item.note ? <small>{item.note}</small> : null}
                          </>
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <label className="shop-field shop-field--quantity">
            <span>Quantity</span>
            <input
              type="number"
              min="1"
              max="9"
              value={quantity}
              onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
            />
          </label>

          <div className="shop-product-actions">
            <button
              type="button"
              className="shop-primary"
              onClick={() => {
                addToCart({ slug: product.slug, quantity, option });
                navigate("/shop/cart");
              }}
            >
              Add to cart
            </button>
            <Link to="/shop/cart" className="shop-secondary">
              View cart
            </Link>
          </div>

          <ul className="shop-meta-list">
            {product.meta.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

function CartPage() {
  usePageMeta({
    title: "Cart — Ableton Shop",
    description: "Review your selected products before checkout.",
    canonicalPath: "/shop/cart",
  });

  const { items, updateCart, removeFromCart, clearCart } = useCart();
  const lines = getCartLines(items);
  const subtotal = getSubtotal(items);
  const estimated = getEstimatedShipping(items);
  const taxEstimate = Math.round(subtotal * 0.08);
  const total = subtotal + estimated + taxEstimate;

  return (
    <main className="shop-cart">
      <header className="shop-subpage-head">
        <div>
          <h1>Cart</h1>
          <p>Review your selected products before checkout.</p>
        </div>
        <div className="shop-cart-head-actions">
          {items.length > 0 && (
            <button type="button" className="shop-text-button" onClick={clearCart}>
              Clear cart
            </button>
          )}
          <Link to="/shop" className="shop-text-link">
            Continue shopping
          </Link>
        </div>
      </header>

      <section className="shop-cart-layout">
        <div className="shop-cart-lines">
          {lines.length === 0 && <p className="shop-empty">Your cart is empty.</p>}
          {lines.map((line) => (
            <article className="shop-cart-line" key={`${line.slug}-${line.option ?? "default"}`}>
              <img className="shop-cart-line-image" src={line.product.image} alt="" />
              <div className="shop-cart-line-info">
                <h2>{line.product.title}</h2>
                <p>{line.option ?? line.product.category}</p>
                <span>{formatLineUnit(line.unitPrice, line.option)}</span>
                {isRentToOwnOption(line.option) && (
                  <span>for {LIVE_RENT_TO_OWN_MONTHS} months</span>
                )}
              </div>
              <div className="shop-cart-line-actions">
                <input
                  aria-label={`Quantity for ${line.product.title}`}
                  type="number"
                  min="0"
                  max="9"
                  value={line.quantity}
                  onChange={(event) =>
                    updateCart(line.slug, Number(event.target.value) || 0, line.option)
                  }
                />
                <strong>{formatLineAmount(line.lineTotal, line.option)}</strong>
                <button type="button" onClick={() => removeFromCart(line.slug, line.option)}>
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
        <OrderSummary
          subtotal={subtotal}
          estimated={estimated}
          taxEstimate={taxEstimate}
          total={total}
          checkout
        />
      </section>
    </main>
  );
}

function OrderSummary({
  subtotal,
  estimated,
  taxEstimate,
  total,
  checkout,
}: {
  subtotal: number;
  estimated: number;
  taxEstimate: number;
  total: number;
  checkout?: boolean;
}) {
  return (
    <aside className="shop-summary">
      <h2>Summary</h2>
      <dl>
        <div>
          <dt>Subtotal</dt>
          <dd>{formatCurrency(subtotal)}</dd>
        </div>
        <div>
          <dt>Estimated shipping</dt>
          <dd>{formatCurrency(estimated)}</dd>
        </div>
        <div>
          <dt>Tax estimate</dt>
          <dd>{formatCurrency(taxEstimate)}</dd>
        </div>
        <div>
          <dt>Total</dt>
          <dd>{formatCurrency(total)}</dd>
        </div>
      </dl>
      <p>Checkout is presented as a portfolio interaction flow.</p>
      {checkout && (
        <Link to="/shop/checkout" className="shop-primary">
          Proceed to checkout
        </Link>
      )}
    </aside>
  );
}

function CheckoutPage() {
  usePageMeta({
    title: "Checkout — Ableton Shop",
    description: "Complete the portfolio checkout flow and review the order summary.",
    canonicalPath: "/shop/checkout",
  });

  const { items, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [checkoutData, setCheckoutData] = useState<CheckoutData>(EMPTY_CHECKOUT_DATA);
  const subtotal = getSubtotal(items);
  const estimated = getEstimatedShipping(items);
  const taxEstimate = Math.round(subtotal * 0.08);
  const total = subtotal + estimated + taxEstimate;
  const lines = getCartLines(items);
  const hasCartItems = lines.length > 0;
  const canContinue = isCheckoutStepValid(step, checkoutData, hasCartItems);
  const checkoutComplete = hasCartItems && isCheckoutComplete(checkoutData);
  const updateCheckoutField = (name: keyof CheckoutData, value: string) => {
    setCheckoutData((current) => ({ ...current, [name]: value }));
  };
  const completeOrder = () => {
    if (!checkoutComplete) return;
    saveOrderForCurrentAccount(createLocalOrder(lines, subtotal, estimated, taxEstimate, total));
    clearCart();
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <main className="shop-checkout">
        <section className="shop-confirmation">
          <span>Order confirmation</span>
          <h1>Order flow complete.</h1>
          <p>The checkout journey is complete and the selected items are cleared from the cart.</p>
          <Link to="/shop" className="shop-primary" onClick={clearCart}>
            Return to Shop
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="shop-checkout">
      <header className="shop-subpage-head">
        <div>
          <h1>Checkout</h1>
          <p>Complete the portfolio checkout flow and review the order summary.</p>
        </div>
        <Link to="/shop/cart" className="shop-text-link">
          Back to cart
        </Link>
      </header>

      <section className="shop-checkout-layout">
        <div className="shop-checkout-panel">
          <ol className="shop-steps">
            {["Contact", "Billing", "Payment", "Review", "Confirm"].map((label, index) => (
              <li key={label} className={step === index + 1 ? "is-active" : ""}>
                {label}
              </li>
            ))}
          </ol>
          {step === 1 && (
            <CheckoutForm
              title="Contact information"
              notice="Enter a valid email address and phone number before continuing."
              fields={CONTACT_FIELDS}
              values={checkoutData}
              onChange={updateCheckoutField}
            />
          )}
          {step === 2 && (
            <CheckoutForm
              title="Billing / delivery"
              notice="Billing details are required before payment details can be entered."
              fields={BILLING_FIELDS}
              values={checkoutData}
              onChange={updateCheckoutField}
            />
          )}
          {step === 3 && (
            <CheckoutForm
              title="Payment method"
              notice="Use sample card details for this portfolio checkout. Card number, expiry, and security code are required."
              fields={PAYMENT_FIELDS}
              values={checkoutData}
              onChange={updateCheckoutField}
            />
          )}
          {step === 4 && (
            <div className="shop-review">
              <h2>Review order</h2>
              {lines.map((line) => (
                <p key={`${line.slug}-${line.option ?? "default"}`}>
                  {line.quantity} x {line.product.title} —{" "}
                  {formatLineAmount(line.lineTotal, line.option)}
                  {isRentToOwnOption(line.option) ? ` for ${LIVE_RENT_TO_OWN_MONTHS} months` : ""}
                </p>
              ))}
              <div className="shop-review-details">
                <span>Contact</span>
                <p>{checkoutData.email}</p>
                <p>{checkoutData.phone}</p>
                <span>Billing</span>
                <p>{checkoutData.fullName}</p>
                <p>
                  {checkoutData.address}, {checkoutData.city}, {checkoutData.postalCode}
                </p>
                <p>{checkoutData.country}</p>
                <span>Payment</span>
                <p>Card ending {normalizeDigits(checkoutData.cardNumber).slice(-4)}</p>
              </div>
              {!hasCartItems && (
                <p className="shop-form-error">
                  Your cart is empty. Return to the cart before placing an order.
                </p>
              )}
            </div>
          )}
          {step === 5 && (
            <div className="shop-review">
              <h2>Confirmation</h2>
              <p>Ready to complete the checkout flow.</p>
              <p>
                The order can only be placed after contact, billing, payment, and cart details are
                complete.
              </p>
              {!checkoutComplete && (
                <p className="shop-form-error">
                  Some required checkout information is missing. Go back and complete the previous
                  steps.
                </p>
              )}
            </div>
          )}
          <div className="shop-step-actions">
            {step === 1 ? (
              <Link to="/shop/cart" className="shop-secondary shop-step-back">
                Back
              </Link>
            ) : (
              <button
                type="button"
                className="shop-secondary shop-step-back"
                onClick={() => setStep(step - 1)}
              >
                Back
              </button>
            )}
            {step < 5 ? (
              <button
                type="button"
                className="shop-primary"
                disabled={!canContinue}
                onClick={() => setStep(step + 1)}
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                className="shop-primary"
                disabled={!checkoutComplete}
                onClick={completeOrder}
              >
                Place order
              </button>
            )}
          </div>
        </div>
        <OrderSummary
          subtotal={subtotal}
          estimated={estimated}
          taxEstimate={taxEstimate}
          total={total}
        />
      </section>
    </main>
  );
}

function CheckoutForm({
  title,
  fields,
  values,
  onChange,
  notice,
}: {
  title: string;
  fields: CheckoutField[];
  values: CheckoutData;
  onChange: (name: keyof CheckoutData, value: string) => void;
  notice?: string;
}) {
  return (
    <form className="shop-demo-form">
      <h2>{title}</h2>
      {notice && <p className="shop-demo-notice">{notice}</p>}
      {fields.map((field) => (
        <label key={field.name} className="shop-field">
          <span>{field.label}</span>
          <input
            required
            type={field.type ?? "text"}
            autoComplete={field.autoComplete}
            inputMode={field.inputMode}
            value={values[field.name]}
            placeholder={field.placeholder}
            onChange={(event) => onChange(field.name, event.target.value)}
          />
        </label>
      ))}
    </form>
  );
}

type AccountTab = "licenses" | "personal" | "orders" | "preferences" | "cloud";

const ACCOUNT_TABS: Array<{ id: AccountTab; label: string }> = [
  { id: "licenses", label: "Licenses & Packs" },
  { id: "personal", label: "Personal details" },
  { id: "orders", label: "Order history" },
  { id: "preferences", label: "Content preferences" },
  { id: "cloud", label: "Manage Cloud" },
];

function AccountPage() {
  usePageMeta({
    title: "Account — Ableton Shop",
    description: "Customer account area for orders, licenses, downloads, and billing information.",
    canonicalPath: "/shop/account",
  });

  const [loggedIn, setLoggedIn] = useState(() => Boolean(getCurrentAccount()));
  const [loginData, setLoginData] = useState(EMPTY_LOGIN_DATA);
  const [registerData, setRegisterData] = useState(EMPTY_REGISTER_DATA);
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [activeTab, setActiveTab] = useState<AccountTab>("licenses");
  const canLogIn = isFilled(loginData.identifier) && loginData.password.length >= 8;
  const canRegister =
    isValidEmail(registerData.email) &&
    registerData.password.length >= 8 &&
    isFilled(registerData.country);
  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canLogIn) {
      setLoginError("Enter your email or username and at least 8 password characters.");
      return;
    }

    setLoginError("");
    setCurrentAccount(loginData.identifier);
    setLoggedIn(true);
  };
  const handleRegisterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canRegister) {
      setRegisterError("Enter a valid email, password, and country or region.");
      return;
    }

    setRegisterError("");
    setCurrentAccount(registerData.email);
    setLoggedIn(true);
  };
  const handleLogout = () => {
    setLoggedIn(false);
    clearCurrentAccount();
    setActiveTab("licenses");
    setLoginData(EMPTY_LOGIN_DATA);
    setRegisterData(EMPTY_REGISTER_DATA);
    setLoginError("");
    setRegisterError("");
  };

  if (!loggedIn) {
    return (
      <main className="shop-account">
        <section className="shop-login-panel">
          <div className="shop-auth-grid">
            <section className="shop-auth-column" aria-labelledby="shop-login-title">
              <h1 id="shop-login-title">Log in</h1>
              <div className="shop-auth-rule" />
              <div className="shop-auth-copy">
                <h2>Why do I need to log in?</h2>
                <p>
                  To use any version of Live, manage downloads, or review orders, you need an
                  Ableton account. It takes less than a minute to create one, and even less to log
                  in if you already have one.
                </p>
              </div>
              <form className="shop-login-form" onSubmit={handleLoginSubmit}>
                <label className="shop-field">
                  <span>E-mail or username</span>
                  <input
                    type="text"
                    autoComplete="username"
                    value={loginData.identifier}
                    onChange={(event) => {
                      setLoginData((current) => ({ ...current, identifier: event.target.value }));
                      setLoginError("");
                    }}
                  />
                </label>
                <label className="shop-field shop-field--password">
                  <span>Password</span>
                  <a
                    href="https://www.ableton.com/en/account/password_reset/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Forgot password?
                  </a>
                  <input
                    type="password"
                    autoComplete="current-password"
                    value={loginData.password}
                    onChange={(event) => {
                      setLoginData((current) => ({ ...current, password: event.target.value }));
                      setLoginError("");
                    }}
                  />
                </label>
                {loginError && <p className="shop-form-error">{loginError}</p>}
                <button type="submit" className="shop-primary" disabled={!canLogIn}>
                  Log in
                </button>
              </form>
            </section>

            <section className="shop-auth-column" aria-labelledby="shop-register-title">
              <h1 id="shop-register-title">Register</h1>
              <div className="shop-auth-rule" />
              <div className="shop-auth-copy">
                <h2>New customer? Please create an account.</h2>
                <p>
                  Your account lets you authorize and download Live plus your included library
                  content.
                </p>
              </div>
              <form className="shop-login-form" onSubmit={handleRegisterSubmit}>
                <label className="shop-field">
                  <span>Email</span>
                  <input
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={registerData.email}
                    onChange={(event) => {
                      setRegisterData((current) => ({ ...current, email: event.target.value }));
                      setRegisterError("");
                    }}
                  />
                </label>
                <label className="shop-field">
                  <span>Password</span>
                  <input
                    type="password"
                    autoComplete="new-password"
                    value={registerData.password}
                    onChange={(event) => {
                      setRegisterData((current) => ({ ...current, password: event.target.value }));
                      setRegisterError("");
                    }}
                  />
                </label>
                <label className="shop-field">
                  <span>First name</span>
                  <input
                    type="text"
                    autoComplete="given-name"
                    placeholder="optional"
                    value={registerData.firstName}
                    onChange={(event) =>
                      setRegisterData((current) => ({ ...current, firstName: event.target.value }))
                    }
                  />
                  <small>So that we know what to call you if we email you.</small>
                </label>
                <label className="shop-field">
                  <span>Last name</span>
                  <input
                    type="text"
                    autoComplete="family-name"
                    placeholder="optional"
                    value={registerData.lastName}
                    onChange={(event) =>
                      setRegisterData((current) => ({ ...current, lastName: event.target.value }))
                    }
                  />
                </label>
                <label className="shop-field">
                  <span>Country or Region</span>
                  <select
                    autoComplete="country-name"
                    value={registerData.country}
                    onChange={(event) =>
                      setRegisterData((current) => ({ ...current, country: event.target.value }))
                    }
                  >
                    <option>Bulgaria</option>
                    <option>Germany</option>
                    <option>United Kingdom</option>
                    <option>United States</option>
                  </select>
                </label>
                <label className="shop-auth-checkbox">
                  <input
                    type="checkbox"
                    checked={registerData.newsletter}
                    onChange={(event) =>
                      setRegisterData((current) => ({
                        ...current,
                        newsletter: event.target.checked,
                      }))
                    }
                  />
                  <span>Get free downloads, discounts and creative tips.</span>
                </label>
                <div className="shop-auth-mailing">
                  <p>Join our mailing list for:</p>
                  <ul>
                    <li>Production tips, tutorials and inspiration</li>
                    <li>Free samples, presets and Live sets</li>
                    <li>Special offers, events and more</li>
                  </ul>
                  <p>We respect your privacy. Unsubscribe any time.</p>
                </div>
                {registerError && <p className="shop-form-error">{registerError}</p>}
                <button type="submit" className="shop-primary" disabled={!canRegister}>
                  Create account
                </button>
              </form>
            </section>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="shop-account">
      <header className="shop-account-head">
        <nav className="shop-account-tabs" aria-label="Account sections">
          {ACCOUNT_TABS.map((tab) => (
            <button
              type="button"
              key={tab.id}
              className={activeTab === tab.id ? "is-active" : ""}
              aria-current={activeTab === tab.id ? "page" : undefined}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <button type="button" className="shop-text-button" onClick={handleLogout}>
          Log out
        </button>
      </header>
      <section className="shop-account-shell">
        <div className="shop-account-main">
          <AccountTabPanel activeTab={activeTab} />
        </div>
        <AccountSidebar activeTab={activeTab} />
      </section>
    </main>
  );
}

function AccountTabPanel({ activeTab }: { activeTab: AccountTab }) {
  if (activeTab === "personal") return <AccountPersonalPanel />;
  if (activeTab === "orders") return <AccountOrdersPanel />;
  if (activeTab === "preferences") return <AccountPreferencesPanel />;
  if (activeTab === "cloud") return <AccountCloudPanel />;
  return <AccountLicensesPanel />;
}

function AccountLicensesPanel() {
  return (
    <div className="shop-account-panel">
      <div className="shop-account-title-row">
        <h1>Licenses</h1>
      </div>
      <section className="shop-account-empty-state" aria-labelledby="account-empty-licenses">
        <h2 id="account-empty-licenses">No licenses registered</h2>
        <p>
          This account does not have any saved licenses, serial numbers, authorizations, or product
          downloads. Real licenses require backend account records, so this frontend demo does not
          invent them.
        </p>
      </section>
      <div className="shop-account-title-row shop-account-title-row--packs">
        <h1>Packs</h1>
      </div>
      <section className="shop-account-empty-state" aria-labelledby="account-empty-packs">
        <h2 id="account-empty-packs">No packs attached</h2>
        <p>
          Purchased and registered Packs would appear here after the account is connected to real
          customer data.
        </p>
      </section>
    </div>
  );
}

function AccountPersonalPanel() {
  const personalSections = [
    { title: "Email Address", value: "Not added" },
    { title: "Password", value: "Not configured in this demo" },
    { title: "Billing Address", value: "Not added" },
    { title: "Shipping Address", value: "Not added" },
    { title: "Email Subscriptions", value: "No subscriptions selected" },
    { title: "User Research", value: "No research preferences saved" },
  ];

  return (
    <div className="shop-account-panel">
      <div className="shop-account-personal-grid">
        {personalSections.map((section) => (
          <section className="shop-account-personal-block" key={section.title}>
            <h1>{section.title}</h1>
            <p>{section.value}</p>
          </section>
        ))}
        <section className="shop-account-personal-block shop-account-personal-block--wide">
          <h1>Product Analytics</h1>
          <p>
            Help us develop better products by sending small amounts of usage data to our servers
            from your Ableton products. Your data will never be shared with third parties and you
            can opt out at any time.
          </p>
          <p>No analytics preference saved</p>
        </section>
      </div>
    </div>
  );
}

function AccountOrdersPanel() {
  const [orders] = useState(() => getAccountOrders());

  return (
    <div className="shop-account-panel">
      <table className="shop-account-orders">
        <thead>
          <tr>
            <th>Date</th>
            <th>Reference</th>
            <th>Products</th>
            <th>Total / Invoice</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={4}>No orders yet</td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.date}</td>
                <td>{order.reference}</td>
                <td>{order.products}</td>
                <td>
                  {formatLineAmount(
                    order.total,
                    order.hasRentToOwn ? LIVE_RENT_TO_OWN_OPTION : undefined
                  )}
                  {order.hasRentToOwn ? ` for ${LIVE_RENT_TO_OWN_MONTHS} months` : ""}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function AccountPreferencesPanel() {
  return (
    <div className="shop-account-panel shop-account-copy-panel">
      <h1>See more of what interests you</h1>
      <p>
        Tell us about the music-making topics you’re interested in and we’ll include more of that
        content in the emails we send you. You’ll still always get the latest product news, special
        offers, surveys and featured articles.
      </p>
      <p>
        <strong>
          You need to be subscribed to the Ableton newsletter to set your content preferences.
        </strong>
      </p>
    </div>
  );
}

function AccountCloudPanel() {
  return (
    <div className="shop-account-panel shop-account-copy-panel">
      <h1>Manage your Ableton Cloud settings</h1>
      <p>
        Ableton Cloud lets you sync up to eight Move or Note Sets so you can access them across
        other Cloud-connected hardware and applications.
      </p>
      <h2>Connected devices</h2>
      <p>
        If you want to deactivate Ableton Cloud on one of your connected devices, click Remove for
        that device. Once deactivated, you will no longer be able to access synced Sets on the
        device.
      </p>
      <p>
        Get started by enabling Ableton Cloud for all of your Ableton hardware and applications.
        Once enabled, you can manage your connected devices here.
      </p>
    </div>
  );
}

function AccountSidebar({ activeTab }: { activeTab: AccountTab }) {
  const helpLinks =
    activeTab === "cloud"
      ? [
          "Browse the Note Knowledge Base ›",
          "View the Note Manual ›",
          "View the Cloud Server Status ›",
          "Contact the Support Team ›",
        ]
      : ["Browse the help section ›", "Contact our support team ›", "My support requests ›"];

  return (
    <aside className="shop-account-side">
      <section className="shop-account-side-card shop-account-side-card--green">
        <h2>Need help?</h2>
        {helpLinks.map((link) => (
          <a href="https://www.ableton.com/en/help/" target="_blank" rel="noreferrer" key={link}>
            {link}
          </a>
        ))}
      </section>
      {activeTab !== "cloud" && (
        <>
          <section className="shop-account-side-card shop-account-side-card--green">
            <h2>Learn</h2>
            <a href="https://www.ableton.com/en/live/learn-live/" target="_blank" rel="noreferrer">
              Learn the fundamentals of music making ›
            </a>
            <a href="https://www.ableton.com/en/blog/" target="_blank" rel="noreferrer">
              Get started with synthesizers ›
            </a>
          </section>
          <section className="shop-account-side-card shop-account-side-card--grey">
            <h2>Get involved</h2>
            <a href="https://www.ableton.com/en/help/" target="_blank" rel="noreferrer">
              Participate in user research ›
            </a>
          </section>
        </>
      )}
    </aside>
  );
}

type ShopRoute = "shop" | "cart" | "checkout" | "account" | "product";

function ShopPage({
  route = "shop",
  productSlug,
  plan,
}: {
  route?: ShopRoute;
  productSlug?: string;
  plan?: string;
}) {
  if (route === "cart") return <CartPage />;
  if (route === "checkout") return <CheckoutPage />;
  if (route === "account") return <AccountPage />;
  if (route === "product") return <ProductDetail productSlug={productSlug} plan={plan} />;
  return <ShopLanding />;
}

export default ShopPage;
