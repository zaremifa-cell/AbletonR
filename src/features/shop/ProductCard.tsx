"use client";

import { Link } from "@/lib/navigation";
import type { ShopProduct } from "@/data/products";

function ProductCard({ product, compact }: { product: ShopProduct; compact?: boolean }) {
  const isLiveArtwork = product.slug === "live-12";
  const productPath = product.slug === "packs" ? "/packs" : `/shop/product/${product.slug}`;

  return (
    <article className={compact ? "shop-card shop-card--compact" : "shop-card"}>
      <Link
        to={productPath}
        className={`shop-card-image${isLiveArtwork ? " shop-card-image--live" : ""}`}
      >
        {isLiveArtwork ? (
          <span className="shop-card-live-label" aria-hidden="true">
            Live
          </span>
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
        <Link to={productPath} className="shop-text-link">
          Learn more
        </Link>
        <Link to={productPath} className="shop-buy">
          Add to cart
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
