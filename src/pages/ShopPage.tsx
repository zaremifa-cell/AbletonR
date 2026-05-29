import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { SHOP_PRODUCTS, getShopProduct, type ShopProduct } from "@/data/products";
import { currency, getCartLines, getEstimatedShipping, getSubtotal } from "@/lib/cart";
import { useCart } from "@/contexts/CartContext";
import { usePageMeta } from "@/hooks/usePageMeta";
import Footer from "@/components/layout/Footer";

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
  const subtotal = getSubtotal(items);
  const estimated = getEstimatedShipping(items);
  const taxEstimate = Math.round(subtotal * 0.08);
  const total = subtotal + estimated + taxEstimate;

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
          {step === 1 && <CheckoutForm title="Contact information" fields={["Email address", "Phone number"]} />}
          {step === 2 && <CheckoutForm title="Billing / delivery" fields={["Full name", "Address", "Country"]} />}
          {step === 3 && (
            <CheckoutForm
              title="Payment method"
              notice="Use sample card details for this portfolio checkout."
              fields={["Card label", "Expiry", "Reference"]}
            />
          )}
          {step === 4 && (
            <div className="shop-review">
              <h2>Review order</h2>
              {getCartLines(items).map((line) => (
                <p key={`${line.slug}-${line.option ?? "default"}`}>{line.quantity} x {line.product.title} — {currency.format(line.lineTotal)}</p>
              ))}
            </div>
          )}
          {step === 5 && (
            <div className="shop-review">
              <h2>Confirmation</h2>
              <p>Ready to complete the checkout flow.</p>
            </div>
          )}
          <div className="shop-step-actions">
            <button type="button" className="shop-secondary" disabled={step === 1} onClick={() => setStep(step - 1)}>Back</button>
            {step < 5 ? (
              <button type="button" className="shop-primary" onClick={() => setStep(step + 1)}>Continue</button>
            ) : (
              <button type="button" className="shop-primary" onClick={() => setConfirmed(true)}>Place order</button>
            )}
          </div>
        </div>
        <OrderSummary subtotal={subtotal} estimated={estimated} taxEstimate={taxEstimate} total={total} />
      </section>
    </main>
  );
}

function CheckoutForm({ title, fields, notice }: { title: string; fields: string[]; notice?: string }) {
  return (
    <form className="shop-demo-form">
      <h2>{title}</h2>
      {notice && <p className="shop-demo-notice">{notice}</p>}
      {fields.map((field) => (
        <label key={field} className="shop-field">
          <span>{field}</span>
          <input placeholder={`Enter ${field.toLowerCase()}`} />
        </label>
      ))}
    </form>
  );
}

function AccountPage() {
  usePageMeta({
    title: "Account — Ableton Shop",
    description: "Customer account area for orders, licenses, downloads, and billing information.",
    canonicalPath: "/shop/account",
  });

  const [loggedIn, setLoggedIn] = useState(false);

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
      <section className="shop-account-grid">
        {["Orders", "Licenses", "Downloads", "Billing info", "Profile"].map((item) => (
          <article key={item}>
            <span>Account</span>
            <h2>{item}</h2>
            <p>Representative content for the portfolio account flow.</p>
          </article>
        ))}
      </section>
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
