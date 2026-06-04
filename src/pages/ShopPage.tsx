import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { SHOP_PRODUCTS, getShopProduct, type ShopProduct } from "@/data/products";
import { currency, getCartLines, getEstimatedShipping, getSubtotal } from "@/lib/cart";
import { useCart } from "@/contexts/CartContext";
import { usePageMeta } from "@/hooks/usePageMeta";
import Footer from "@/components/layout/Footer";

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
  { name: "address", label: "Address", placeholder: "Street and number", autoComplete: "street-address" },
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
  { name: "cardName", label: "Name on card", placeholder: "Cardholder name", autoComplete: "cc-name" },
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

const normalizeDigits = (value: string) => value.replace(/\D/g, "");
const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
const isFilled = (value: string) => value.trim().length > 0;
const isValidExpiry = (value: string) => /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(value.trim());

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
            <span className="shop-hero-copy-line">selected merchandise in a polished portfolio buying flow.</span>
          </p>
        </div>
        <div className="shop-hero-links">
          <Link to="/shop/cart" className="shop-text-link">View cart</Link>
          <Link to="/shop/account" className="shop-text-link">Account</Link>
        </div>
      </section>

      <section className="shop-section" id="shop-products">
        <div className="shop-section-head">
          <h2>Products</h2>
          <p>Software, hardware, and sound content for music making.</p>
        </div>
        <div className="shop-product-grid" ref={productRailRef}>
          {SHOP_PRODUCTS.map((product) => (
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

function ProductCard({
  product,
  compact,
}: {
  product: ShopProduct;
  compact?: boolean;
}) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({ slug: product.slug });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  const isLiveArtwork = product.slug === "live-12";

  return (
    <article className={compact ? "shop-card shop-card--compact" : "shop-card"}>
      <Link
        to={`/shop/product/${product.slug}`}
        className={`shop-card-image${isLiveArtwork ? " shop-card-image--live" : ""}`}
      >
        {isLiveArtwork ? (
          <span className="shop-card-live-label" aria-hidden="true">Live</span>
        ) : (
          <img src={product.image} alt={product.title} />
        )}
      </Link>
      <div className="shop-card-body">
        <span className="shop-card-category">{product.category}</span>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
      </div>
      <div className="shop-card-actions">
        <Link to={`/shop/product/${product.slug}`} className="shop-text-link">Learn more</Link>
        <button type="button" className={`shop-buy${added ? " is-added" : ""}`} onClick={handleAddToCart}>
          Add to cart
        </button>
      </div>
    </article>
  );
}

function ProductDetail() {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = getShopProduct(productSlug ?? "") ?? SHOP_PRODUCTS[0];
  const [option, setOption] = useState(product.options?.[0] ?? "");
  const [quantity, setQuantity] = useState(1);

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

  return (
    <main className="shop-product-detail">
      <section className="shop-product-hero">
        <div className="shop-product-media">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="shop-product-copy">
          <Link to="/shop" className="shop-text-link">Back to Shop</Link>
          <span className="shop-card-category">{product.category}</span>
          <h1>{product.title}</h1>
          <p>{product.detail}</p>
          <strong>{product.priceLabel}</strong>

          {product.options && (
            <label className="shop-field">
              <span>Option</span>
              <select value={option} onChange={(event) => setOption(event.target.value)}>
                {product.options.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
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
            <Link to="/shop/cart" className="shop-secondary">View cart</Link>
          </div>

          <ul className="shop-meta-list">
            {product.meta.map((item) => <li key={item}>{item}</li>)}
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
          <Link to="/shop" className="shop-text-link">Continue shopping</Link>
        </div>
      </header>

      <section className="shop-cart-layout">
        <div className="shop-cart-lines">
          {lines.length === 0 && <p className="shop-empty">Your cart is empty.</p>}
          {lines.map((line) => (
            <article className="shop-cart-line" key={`${line.slug}-${line.option ?? "default"}`}>
              <img src={line.product.image} alt="" />
              <div>
                <h2>{line.product.title}</h2>
                <p>{line.option ?? line.product.category}</p>
                <span>{currency.format(line.product.price)} each</span>
              </div>
              <input
                aria-label={`Quantity for ${line.product.title}`}
                type="number"
                min="0"
                max="9"
                value={line.quantity}
                onChange={(event) => updateCart(line.slug, Number(event.target.value) || 0, line.option)}
              />
              <strong>{currency.format(line.lineTotal)}</strong>
              <button type="button" onClick={() => removeFromCart(line.slug, line.option)}>Remove</button>
            </article>
          ))}
        </div>
        <OrderSummary subtotal={subtotal} estimated={estimated} taxEstimate={taxEstimate} total={total} checkout />
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
        <div><dt>Subtotal</dt><dd>{currency.format(subtotal)}</dd></div>
        <div><dt>Estimated shipping</dt><dd>{currency.format(estimated)}</dd></div>
        <div><dt>Tax estimate</dt><dd>{currency.format(taxEstimate)}</dd></div>
        <div><dt>Total</dt><dd>{currency.format(total)}</dd></div>
      </dl>
      <p>Checkout is presented as a portfolio interaction flow.</p>
      {checkout && <Link to="/shop/checkout" className="shop-primary">Proceed to checkout</Link>}
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
          <Link to="/shop" className="shop-primary" onClick={clearCart}>Return to Shop</Link>
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
        <Link to="/shop/cart" className="shop-text-link">Back to cart</Link>
      </header>

      <section className="shop-checkout-layout">
        <div className="shop-checkout-panel">
          <ol className="shop-steps">
            {["Contact", "Billing", "Payment", "Review", "Confirm"].map((label, index) => (
              <li key={label} className={step === index + 1 ? "is-active" : ""}>{label}</li>
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
                <p key={`${line.slug}-${line.option ?? "default"}`}>{line.quantity} x {line.product.title} — {currency.format(line.lineTotal)}</p>
              ))}
              <div className="shop-review-details">
                <span>Contact</span>
                <p>{checkoutData.email}</p>
                <p>{checkoutData.phone}</p>
                <span>Billing</span>
                <p>{checkoutData.fullName}</p>
                <p>{checkoutData.address}, {checkoutData.city}, {checkoutData.postalCode}</p>
                <p>{checkoutData.country}</p>
                <span>Payment</span>
                <p>Card ending {normalizeDigits(checkoutData.cardNumber).slice(-4)}</p>
              </div>
              {!hasCartItems && <p className="shop-form-error">Your cart is empty. Return to the cart before placing an order.</p>}
            </div>
          )}
          {step === 5 && (
            <div className="shop-review">
              <h2>Confirmation</h2>
              <p>Ready to complete the checkout flow.</p>
              <p>
                The order can only be placed after contact, billing, payment, and cart details are complete.
              </p>
              {!checkoutComplete && <p className="shop-form-error">Some required checkout information is missing. Go back and complete the previous steps.</p>}
            </div>
          )}
          <div className="shop-step-actions">
            {step === 1 ? (
              <Link to="/shop/cart" className="shop-secondary shop-step-back">Back</Link>
            ) : (
              <button type="button" className="shop-secondary shop-step-back" onClick={() => setStep(step - 1)}>Back</button>
            )}
            {step < 5 ? (
              <button type="button" className="shop-primary" disabled={!canContinue} onClick={() => setStep(step + 1)}>Continue</button>
            ) : (
              <button type="button" className="shop-primary" disabled={!checkoutComplete} onClick={completeOrder}>Place order</button>
            )}
          </div>
        </div>
        <OrderSummary subtotal={subtotal} estimated={estimated} taxEstimate={taxEstimate} total={total} />
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

type AccountSection = {
  title: string;
  label: string;
  summary: string;
  rows: string[][];
  actions: string[];
  detailIntro: string;
  detailRows: {
    title: string;
    meta: string;
    body: string;
    status: string;
    actions: string[];
  }[];
};

const ACCOUNT_SECTIONS: AccountSection[] = [
  {
    title: "Orders",
    label: "Order history",
    summary: "Recent purchases and archived invoices for this portfolio customer.",
    rows: [
      ["21 May 2026", "Order 10836699", "Push", "EUR 949.00"],
      ["16 May 2026", "Order 10829414", "Orchestral Strings, Glitch and Wash", "EUR 0.00"],
      ["03 Jun 2025", "Order 9853378", "Live 12 Intro", "EUR 99.00"],
    ],
    actions: ["View invoice", "Download receipt"],
    detailIntro: "Archived orders, invoices, payment references, and products connected to this customer account.",
    detailRows: [
      {
        title: "Order 10836699",
        meta: "21 May 2026 / Push / EUR 949.00",
        body: "Push 3 controller, standard shipping to Sofia. Invoice AB-2026-10836699 is available for company accounting.",
        status: "Paid / Fulfilled",
        actions: ["Open invoice", "Track shipment", "Start return"],
      },
      {
        title: "Order 10829414",
        meta: "16 May 2026 / Orchestral Strings, Glitch and Wash, Session Drums / EUR 0.00",
        body: "Pack licenses assigned to this account through a promotional bundle. Downloads remain available in the product library.",
        status: "Archived",
        actions: ["View order", "Download packs"],
      },
      {
        title: "Order 9853378",
        meta: "03 Jun 2025 / Live 12 Intro / EUR 99.00",
        body: "Software purchase with payment reference pi_1NEooWLrbwutfO9lwhlmch6n. License is active and eligible for upgrade offers.",
        status: "Paid / Licensed",
        actions: ["Open receipt", "View license"],
      },
    ],
  },
  {
    title: "Licenses",
    label: "Licenses & packs",
    summary: "Registered software and hardware authorizations connected to the account.",
    rows: [
      ["Live 12 Intro", "Version 12.1.2", "macOS Universal", "Authorized"],
      ["Push", "Serial ending 8412", "Standalone upgrade eligible", "Registered"],
      ["Move", "Cloud sync enabled", "2 devices", "Active"],
    ],
    actions: ["View authorization history", "Upgrade offers"],
    detailIntro: "Registered Ableton products, authorized machines, cloud-enabled devices, and available upgrades.",
    detailRows: [
      {
        title: "Live 12 Intro",
        meta: "Version 12.1.2 / macOS Universal / 3.8 GB",
        body: "Authorized on Zlatko Studio MacBook and one spare activation remains available. Latest installer is ready in Downloads.",
        status: "Authorized",
        actions: ["Authorize another computer", "View authorization history", "Upgrade to Suite"],
      },
      {
        title: "Push",
        meta: "Serial ending 8412 / Registered hardware",
        body: "Hardware warranty is active. Standalone Upgrade Kit offer is available for this registered Push unit.",
        status: "Registered",
        actions: ["Manage registration", "Get Upgrade Kit"],
      },
      {
        title: "Move",
        meta: "Cloud sync enabled / 2 connected devices",
        body: "Move Sets sync with Ableton Cloud and can be continued in Note or Live when signed in.",
        status: "Cloud active",
        actions: ["Manage Cloud", "View synced sets"],
      },
    ],
  },
  {
    title: "Downloads",
    label: "Product library",
    summary: "Installers, sound packs, and device content ready for re-download.",
    rows: [
      ["Live 12 Intro", "3.8 GB", "macOS / Windows", "Download"],
      ["Session Drums", "1.2 GB", "Pack", "Download"],
      ["MIDI Tools Collection", "420 MB", "Max for Live", "Download"],
    ],
    actions: ["Download all", "Installation help"],
    detailIntro: "Installers and sound content attached to the account, with platform, size, and update status.",
    detailRows: [
      {
        title: "Live 12 Intro",
        meta: "12.1.2 / macOS Universal + Windows / 3.8 GB",
        body: "Current production installer. Includes instruments, effects, and factory content available with the Intro license.",
        status: "Current",
        actions: ["Download macOS", "Download Windows", "Release notes"],
      },
      {
        title: "Session Drums",
        meta: "Pack / 1.2 GB / Updated 14 May 2026",
        body: "Multi-sampled drum kits, groove presets, and device racks for Live 12.",
        status: "Installed once",
        actions: ["Download pack", "Installation help"],
      },
      {
        title: "MIDI Tools Collection",
        meta: "Max for Live / 420 MB / Requires Live 12",
        body: "Generators, transformers, and performance utilities connected to the Live 12 MIDI workflow.",
        status: "Available",
        actions: ["Download tools", "View requirements"],
      },
    ],
  },
  {
    title: "Billing info",
    label: "Personal details",
    summary: "Billing, shipping, subscriptions, and payment profile used at checkout.",
    rows: [
      ["Email", "zlatkofx@gmail.com", "Verified", "Edit"],
      ["Billing address", "7 Anton Strashimirov Street, Plovdiv", "Bulgaria", "Edit"],
      ["Payment", "Visa ending 4242", "Expires 08/28", "Edit"],
    ],
    actions: ["Manage addresses", "Tax information"],
    detailIntro: "Personal details used for invoices, shipping, subscriptions, payment profile, and tax records.",
    detailRows: [
      {
        title: "Email and password",
        meta: "zlatkofx@gmail.com / Password last changed 12 Mar 2026",
        body: "This email receives invoices, license notifications, download updates, and support communication.",
        status: "Verified",
        actions: ["Edit email", "Change password"],
      },
      {
        title: "Billing and shipping",
        meta: "Billing: 7 Anton Strashimirov Street, Plovdiv / Shipping: 1 Georgi Benkovski Street, Sofia",
        body: "Billing address is used for invoices. Shipping address is used for hardware orders and returns.",
        status: "Complete",
        actions: ["Edit billing", "Edit shipping", "Add VAT ID"],
      },
      {
        title: "Payment and tax",
        meta: "Visa ending 4242 / Expires 08/28 / Bulgaria",
        body: "Saved payment profile is used for demo checkout continuity. Tax estimates are calculated before order placement.",
        status: "Ready for checkout",
        actions: ["Update card", "View tax information"],
      },
    ],
  },
  {
    title: "Profile",
    label: "Preferences",
    summary: "Newsletter, content, research, and cloud settings for the user profile.",
    rows: [
      ["Newsletter", "Ableton newsletter in English", "Subscribed", "Edit"],
      ["Content", "Packs, Live Sets and devices", "Selected", "Edit"],
      ["Cloud", "Move and Note Sets", "2 synced devices", "Manage"],
    ],
    actions: ["Edit preferences", "Manage Cloud"],
    detailIntro: "Newsletter subscriptions, content preferences, product analytics, research participation, and cloud devices.",
    detailRows: [
      {
        title: "Content preferences",
        meta: "Packs, Live Sets and devices / Artist features / Advanced music-making techniques",
        body: "These preferences influence account recommendations, newsletters, and learning content.",
        status: "3 topics selected",
        actions: ["Edit preferences", "Reset topics"],
      },
      {
        title: "Subscriptions and research",
        meta: "Ableton newsletter in English / Loop News in English / User research off",
        body: "Marketing and research settings are managed separately from required account and order notifications.",
        status: "Subscribed",
        actions: ["Manage subscriptions", "Join user research"],
      },
      {
        title: "Ableton Cloud",
        meta: "Move and Note Sets / 2 synced devices / Last sync today",
        body: "Cloud keeps sketches available across connected hardware, Note, and Live.",
        status: "Active",
        actions: ["Manage devices", "View cloud status"],
      },
    ],
  },
];

function AccountPage() {
  usePageMeta({
    title: "Account — Ableton Shop",
    description: "Customer account area for orders, licenses, downloads, and billing information.",
    canonicalPath: "/shop/account",
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState<AccountSection | null>(null);

  if (!loggedIn) {
    return (
      <main className="shop-account">
        <section className="shop-login-panel">
          <span>Account access</span>
          <h1>Customer login</h1>
          <p>Open the account view to inspect orders, licenses, downloads, and billing information.</p>
          <button type="button" className="shop-primary" onClick={() => setLoggedIn(true)}>Enter account</button>
        </section>
      </main>
    );
  }

  return (
    <main className="shop-account">
      <header className="shop-subpage-head">
        <div>
          <h1>Account</h1>
          <p>Account area for orders, licenses, downloads, and billing information.</p>
        </div>
        <button type="button" className="shop-secondary" onClick={() => setLoggedIn(false)}>Log out</button>
      </header>
      {activeSection ? (
        <section className="shop-account-detail">
          <button type="button" className="shop-text-button" onClick={() => setActiveSection(null)}>
            Back to account overview
          </button>
          <div className="shop-account-detail-head">
            <span>{activeSection.label}</span>
            <h2>{activeSection.title}</h2>
            <p>{activeSection.detailIntro}</p>
          </div>
          <div className="shop-account-detail-list">
            {activeSection.detailRows.map((item) => (
              <article key={item.title} className="shop-account-detail-card">
                <div>
                  <span>{item.status}</span>
                  <h3>{item.title}</h3>
                  <small>{item.meta}</small>
                  <p>{item.body}</p>
                </div>
                <div className="shop-account-actions">
                  {item.actions.map((action) => (
                    <button type="button" key={action}>{action}</button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <section className="shop-account-grid" aria-label="Account overview">
          {ACCOUNT_SECTIONS.map((section) => (
            <article key={section.title}>
              <button type="button" className="shop-account-card-button" onClick={() => setActiveSection(section)}>
                <span>{section.label}</span>
                <h2>{section.title}</h2>
                <p>{section.summary}</p>
                <div className="shop-account-records">
                  {section.rows.map((row) => (
                    <div className="shop-account-record" key={`${section.title}-${row[0]}`}>
                      <strong>{row[0]}</strong>
                      <small>{row[1]}</small>
                      <small>{row[2]}</small>
                      <em>{row[3]}</em>
                    </div>
                  ))}
                </div>
              </button>
              <div className="shop-account-actions">
                {section.actions.map((action) => (
                  <button type="button" key={action} onClick={() => setActiveSection(section)}>{action}</button>
                ))}
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

function ShopPage() {
  const { productSlug } = useParams();
  const { pathname } = useLocation();

  if (pathname.endsWith("/cart")) return <CartPage />;
  if (pathname.endsWith("/checkout")) return <CheckoutPage />;
  if (pathname.endsWith("/account")) return <AccountPage />;
  if (productSlug) return <ProductDetail />;
  return <ShopLanding />;
}

export default ShopPage;
