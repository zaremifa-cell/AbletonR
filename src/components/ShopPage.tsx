import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";

export type ShopProduct = {
  slug: string;
  title: string;
  category: string;
  description: string;
  price: number;
  priceLabel: string;
  image: string;
  detail: string;
  meta: string[];
  options?: string[];
};

export type CartItem = {
  slug: string;
  quantity: number;
  option?: string;
};

export type AddToCartInput = {
  slug: string;
  quantity?: number;
  option?: string;
};

type ShopPageProps = {
  cartItems: CartItem[];
  onAddToCart: (item: AddToCartInput) => void;
  onUpdateCart: (slug: string, quantity: number, option?: string) => void;
  onRemoveFromCart: (slug: string, option?: string) => void;
  onClearCart: () => void;
};

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    slug: "live-12",
    title: "Live 12",
    category: "Live",
    description: "The central Ableton software instrument for composing, recording, and performing.",
    price: 749,
    priceLabel: "From $99",
    image: "/live.jpg",
    detail: "Live 12 is the software layer of the Ableton system: Session View, Arrangement View, instruments, effects, and a workflow built for non-linear music making.",
    meta: ["Download license", "macOS / Windows", "Intro, Standard, and Suite editions"],
    options: ["Intro", "Standard", "Suite", "Education license"],
  },
  {
    slug: "push",
    title: "Push",
    category: "Push",
    description: "A tactile hardware surface for playing, sequencing, and controlling Live.",
    price: 999,
    priceLabel: "From $999",
    image: "/push/Push3 product.png",
    detail: "Push turns Live into an instrument you can touch, with expressive pads, screen-led control, and standalone options.",
    meta: ["Ships in demo flow", "Standalone option available", "USB-C connection"],
    options: ["Tethered", "Standalone"],
  },
  {
    slug: "move",
    title: "Move",
    category: "Move",
    description: "Portable standalone sketching for fast ideas away from the studio.",
    price: 449,
    priceLabel: "$449",
    image: "/move/hero-girl.jpg",
    detail: "Move is a compact instrument for starting ideas anywhere, then sending sketches into Ableton Cloud and Live.",
    meta: ["Hardware shipping demo", "Includes Live Intro", "Battery powered"],
    options: ["Move", "Move with protective case"],
  },
  {
    slug: "packs",
    title: "Packs",
    category: "Packs",
    description: "A curated software sound and device bundle for Live and Max for Live.",
    price: 79,
    priceLabel: "From $79",
    image: "/packs/packs_footage/Tape.jpg",
    detail: "A compact archive of instruments, effects, and sound material for expanding Live.",
    meta: ["Download content", "Requires Live", "Some Packs require Max for Live"],
    options: ["Studio bundle", "Max for Live bundle"],
  },
  {
    slug: "note",
    title: "Note",
    category: "Note",
    description: "A mobile idea-capture app for drums, melodies, and samples.",
    price: 0,
    priceLabel: "Free demo",
    image: "/note.jpg",
    detail: "Note captures musical ideas on iPhone and iPad, then sends them into Ableton Cloud and Live.",
    meta: ["iOS app", "Ableton Cloud workflow", "Front-end demo item"],
    options: ["Note app"],
  },
  {
    slug: "merchandise",
    title: "Merchandise",
    category: "Merchandise",
    description: "Selected apparel and studio objects for the Ableton ecosystem.",
    price: 49,
    priceLabel: "From $49",
    image: "/artist-fl.png",
    detail: "A restrained merchandise capsule for the front-end Shop prototype.",
    meta: ["Demo shipping item", "Size selection placeholder", "No real checkout"],
    options: ["T-shirt", "Tote", "Poster"],
  },
];

export const getShopProduct = (slug: string) => SHOP_PRODUCTS.find((product) => product.slug === slug);

export const getCartCount = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.quantity, 0);

const getCartLines = (items: CartItem[]) =>
  items
    .map((item) => {
      const product = getShopProduct(item.slug);
      if (!product) return null;
      return { ...item, product, lineTotal: product.price * item.quantity };
    })
    .filter(Boolean) as Array<CartItem & { product: ShopProduct; lineTotal: number }>;

const getSubtotal = (items: CartItem[]) =>
  getCartLines(items).reduce((total, item) => total + item.lineTotal, 0);

function ShopLanding({ onAddToCart }: Pick<ShopPageProps, "onAddToCart">) {
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
            <span className="shop-hero-copy-line">selected merchandise in a front-end demo buying flow.</span>
          </p>
        </div>
        <div className="shop-hero-links">
          <Link to="/shop/cart" className="shop-text-link">View cart</Link>
          <Link to="/shop/account" className="shop-text-link">Demo account</Link>
        </div>
      </section>

      <section className="shop-section" id="shop-products">
        <div className="shop-section-head">
          <h2>Products</h2>
          <p>Software, hardware, and sound content for music making.</p>
        </div>
        <div className="shop-product-grid" ref={productRailRef}>
          {SHOP_PRODUCTS.map((product) => (
            <ProductCard key={product.slug} product={product} onAddToCart={onAddToCart} />
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
  onAddToCart,
}: {
  product: ShopProduct;
  compact?: boolean;
  onAddToCart: ShopPageProps["onAddToCart"];
}) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart({ slug: product.slug });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  const isLivePlaceholder = product.slug === "live-12";

  return (
    <article className={compact ? "shop-card shop-card--compact" : "shop-card"}>
      <Link
        to={`/shop/product/${product.slug}`}
        className={`shop-card-image${isLivePlaceholder ? " shop-card-image--live" : ""}`}
      >
        {isLivePlaceholder ? (
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

function ProductDetail({ onAddToCart }: Pick<ShopPageProps, "onAddToCart">) {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const product = getShopProduct(productSlug ?? "") ?? SHOP_PRODUCTS[0];
  const [option, setOption] = useState(product.options?.[0] ?? "");
  const [quantity, setQuantity] = useState(1);

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
                onAddToCart({ slug: product.slug, quantity, option });
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

function CartPage({ cartItems, onUpdateCart, onRemoveFromCart }: Omit<ShopPageProps, "onAddToCart" | "onClearCart">) {
  const lines = getCartLines(cartItems);
  const subtotal = getSubtotal(cartItems);
  const estimated = subtotal > 0 ? 24 : 0;
  const demoTax = Math.round(subtotal * 0.08);
  const total = subtotal + estimated + demoTax;

  return (
    <main className="shop-cart">
      <header className="shop-subpage-head">
        <div>
          <h1>Cart</h1>
          <p>Review your selected demo products before checkout.</p>
        </div>
        <Link to="/shop" className="shop-text-link">Continue shopping</Link>
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
                min="1"
                max="9"
                value={line.quantity}
                onChange={(event) => onUpdateCart(line.slug, Math.max(1, Number(event.target.value) || 1), line.option)}
              />
              <strong>{currency.format(line.lineTotal)}</strong>
              <button type="button" onClick={() => onRemoveFromCart(line.slug, line.option)}>Remove</button>
            </article>
          ))}
        </div>
        <OrderSummary subtotal={subtotal} estimated={estimated} demoTax={demoTax} total={total} checkout />
      </section>
    </main>
  );
}

function OrderSummary({
  subtotal,
  estimated,
  demoTax,
  total,
  checkout,
}: {
  subtotal: number;
  estimated: number;
  demoTax: number;
  total: number;
  checkout?: boolean;
}) {
  return (
    <aside className="shop-summary">
      <h2>Summary</h2>
      <dl>
        <div><dt>Subtotal</dt><dd>{currency.format(subtotal)}</dd></div>
        <div><dt>Estimated shipping</dt><dd>{currency.format(estimated)}</dd></div>
        <div><dt>Demo tax estimate</dt><dd>{currency.format(demoTax)}</dd></div>
        <div><dt>Total</dt><dd>{currency.format(total)}</dd></div>
      </dl>
      <p>This is a front-end demo. No real payment will be processed.</p>
      {checkout && <Link to="/shop/checkout" className="shop-primary">Proceed to checkout</Link>}
    </aside>
  );
}

function CheckoutPage({ cartItems, onClearCart }: Pick<ShopPageProps, "cartItems" | "onClearCart">) {
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const subtotal = getSubtotal(cartItems);
  const estimated = subtotal > 0 ? 24 : 0;
  const demoTax = Math.round(subtotal * 0.08);
  const total = subtotal + estimated + demoTax;

  if (confirmed) {
    return (
      <main className="shop-checkout">
        <section className="shop-confirmation">
          <span>Demo confirmation</span>
          <h1>Order prototype complete.</h1>
          <p>This front-end checkout did not process payment, create an account, or store real billing data.</p>
          <Link to="/shop" className="shop-primary" onClick={onClearCart}>Return to Shop</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="shop-checkout">
      <header className="shop-subpage-head">
        <div>
          <h1>Checkout</h1>
          <p>This is a front-end demo. No real payment will be processed.</p>
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
          {step === 1 && <DemoForm title="Contact information" fields={["Demo email", "Demo phone"]} />}
          {step === 2 && <DemoForm title="Billing / delivery" fields={["Demo name", "Demo address", "Demo country"]} />}
          {step === 3 && (
            <DemoForm
              title="Fake payment method"
              notice="Use placeholder fields only. Do not enter real card data."
              fields={["Demo card label", "Demo expiry", "Demo reference"]}
            />
          )}
          {step === 4 && (
            <div className="shop-review">
              <h2>Review order</h2>
              {getCartLines(cartItems).map((line) => (
                <p key={`${line.slug}-${line.option ?? "default"}`}>{line.quantity} x {line.product.title} — {currency.format(line.lineTotal)}</p>
              ))}
            </div>
          )}
          {step === 5 && (
            <div className="shop-review">
              <h2>Demo confirmation</h2>
              <p>Ready to complete the prototype checkout. No payment will be processed.</p>
            </div>
          )}
          <div className="shop-step-actions">
            <button type="button" className="shop-secondary" disabled={step === 1} onClick={() => setStep(step - 1)}>Back</button>
            {step < 5 ? (
              <button type="button" className="shop-primary" onClick={() => setStep(step + 1)}>Continue</button>
            ) : (
              <button type="button" className="shop-primary" onClick={() => setConfirmed(true)}>Place demo order</button>
            )}
          </div>
        </div>
        <OrderSummary subtotal={subtotal} estimated={estimated} demoTax={demoTax} total={total} />
      </section>
    </main>
  );
}

function DemoForm({ title, fields, notice }: { title: string; fields: string[]; notice?: string }) {
  return (
    <form className="shop-demo-form">
      <h2>{title}</h2>
      {notice && <p className="shop-demo-notice">{notice}</p>}
      {fields.map((field) => (
        <label key={field} className="shop-field">
          <span>{field}</span>
          <input placeholder={`${field} placeholder`} />
        </label>
      ))}
    </form>
  );
}

function AccountPage() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return (
      <main className="shop-account">
        <section className="shop-login-panel">
          <span>Prototype account</span>
          <h1>Demo login</h1>
          <p>No real authentication is used. This opens a local front-end account view for portfolio demonstration.</p>
          <button type="button" className="shop-primary" onClick={() => setLoggedIn(true)}>Enter demo account</button>
        </section>
      </main>
    );
  }

  return (
    <main className="shop-account">
      <header className="shop-subpage-head">
        <div>
          <h1>Account</h1>
          <p>Prototype account area for orders, licenses, downloads, and billing placeholders.</p>
        </div>
        <button type="button" className="shop-secondary" onClick={() => setLoggedIn(false)}>Log out demo</button>
      </header>
      <section className="shop-account-grid">
        {["Orders", "Licenses", "Downloads", "Billing info", "Profile"].map((item) => (
          <article key={item}>
            <span>Demo</span>
            <h2>{item}</h2>
            <p>Placeholder content for the front-end prototype. No private data is stored.</p>
          </article>
        ))}
      </section>
    </main>
  );
}

function ShopPage(props: ShopPageProps) {
  const { productSlug } = useParams();
  const { pathname } = useLocation();

  if (pathname.endsWith("/cart")) return <CartPage {...props} />;
  if (pathname.endsWith("/checkout")) return <CheckoutPage cartItems={props.cartItems} onClearCart={props.onClearCart} />;
  if (pathname.endsWith("/account")) return <AccountPage />;
  if (productSlug) return <ProductDetail onAddToCart={props.onAddToCart} />;
  return <ShopLanding onAddToCart={props.onAddToCart} />;
}

export default ShopPage;
