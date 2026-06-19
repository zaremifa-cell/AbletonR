"use client";

import { useState } from "react";
import { Link } from "@/lib/navigation";
import { PACKS, packImage } from "@/data/packs";
import { useCart } from "@/contexts/CartContext";
import { usePageMeta } from "@/hooks/usePageMeta";
import { usePackPreview } from "@/contexts/PackPreviewContext";

type PacksPageProps = {
  packSlug?: string;
};

function PacksGrid() {
  const { setActivePack } = usePackPreview();
  usePageMeta({
    title: "Packs — Ableton Programme",
    description:
      "Browse the Ableton Packs archive: instruments, drum kits, textures and Max for Live devices presented as a typographic grid.",
    canonicalPath: "/packs",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Ableton Packs",
      description: "Sound packs, instruments and Max for Live devices.",
    },
  });

  return (
    <main className="packs-page">
      <section className="packs-grid" aria-label="Ableton Packs archive">
        {PACKS.map((pack, index) => (
          <Link
            key={pack.slug}
            to={`/packs/${pack.slug}`}
            className="pack-tile"
            onFocus={() => setActivePack({ slug: pack.slug, title: pack.title })}
            onPointerEnter={() => setActivePack({ slug: pack.slug, title: pack.title })}
          >
            <img src={packImage(pack.file)} alt={pack.title} loading={index < 18 ? "eager" : "lazy"} />
            <span className="pack-tile-meta">
              <span className="mono">{String(index + 1).padStart(2, "0")}</span>
              <span>{pack.title}</span>
            </span>
            <span className="pack-tile-cue" aria-hidden="true">[ View Pack ]</span>
          </Link>
        ))}
      </section>
    </main>
  );
}

function PackDetail({ packSlug }: { packSlug?: string }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const pack = PACKS.find((item) => item.slug === packSlug) ?? PACKS[0];

  const handleBuyPack = () => {
    addToCart({ slug: pack.slug, option: pack.title });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  usePageMeta({
    title: `${pack.title} — Ableton Packs`,
    description: `${pack.title} by ${pack.maker} — ${pack.format} pack in the Ableton Programme portfolio archive.`,
    canonicalPath: `/packs/${pack.slug}`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: pack.title,
      brand: { "@type": "Brand", name: pack.maker },
      category: pack.format,
    },
  });

  return (
    <main className="pack-detail">
      <section className="pack-detail-split" aria-labelledby="pack-detail-title">
        <div className="pack-detail-media">
          <img src={packImage(pack.file)} alt={pack.title} />
        </div>
        <article className="pack-detail-copy">
          <Link className="pack-detail-close" to="/packs" aria-label="Close pack detail">
            <span aria-hidden="true"></span>
          </Link>
          <div>
            <p className="pack-detail-maker">{pack.maker}</p>
            <h1 id="pack-detail-title">{pack.title}</h1>
            <p className="pack-detail-format">{pack.format}</p>
          </div>
          <div className="pack-detail-body">
            <p>
              A focused sound and device collection for building sketches quickly, then shaping
              them into finished Live sets with a clear studio workflow.
            </p>
            <p>
              Designed for sketching, processing and performance inside Live, this pack adds a
              focused set of instruments, devices and sound material to the studio.
            </p>
          </div>
          <div className="pack-detail-footer">
            <span>Requires Live 12 Standard and Max for Live or above.</span>
            <div className="pack-detail-purchase">
              <strong>{pack.priceLabel}</strong>
              <button
                type="button"
                className={`pack-buy-button${added ? " is-added" : ""}`}
                onClick={handleBuyPack}
              >
                {added ? "Added" : "Buy Now"}
              </button>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}

function PacksPage({ packSlug }: PacksPageProps) {
  if (packSlug) return <PackDetail packSlug={packSlug} />;
  return <PacksGrid />;
}

export default PacksPage;
