import { Link, useParams } from "react-router-dom";

export type PackSummary = {
  slug: string;
  title: string;
};

type Pack = PackSummary & {
  file: string;
  maker: string;
  format: string;
};

type PacksPageProps = {
  onPackHover: (pack: PackSummary | null) => void;
};

const PACK_FILES = [
  "64 Pad Lab.jpg",
  "Acid Rain Technology Maestro.webp",
  "Alter Echo.jpg",
  "Analogik Drums.jpg",
  "Analogik Waves.jpg",
  "Cinematic Percussion.jpg",
  "Color Limiter.jpg",
  "DS Kick.jpg",
  "Destiny Plus Programma 900.jpg",
  "Experimental Game Grid.jpg",
  "Filament 1.0.jpeg",
  "Game Boy Advance.png",
  "Holder.jpg",
  "MSI-001 Signal Processor .jpg",
  "Metropolis Sequencer.jpg",
  "Microtron.jpg",
  "OSCiLLOT.jpg",
  "Oto Machines Bam.webp",
  "Pitck Hack.jpg",
  "STING.gif",
  "Soilturner 2.0",
  "Speaker.jpg",
  "Spiritualized.jpg",
  "Synthesis AI006.webp",
  "Tape.jpg",
  "This paper.jpg",
  "Tonverk.jpg",
  "analog.jpg",
  "erbenerb.jpg",
  "issue 6.jpg",
  "knobs.jpg",
  "mode amp.jpg",
  "morph addign.jpg",
  "obj 02.jpg",
  "superlunar sr-03.jpg",
  "wavetable oscilator.jpg",
];

const toTitle = (file: string) => file.replace(/\.[^/.]+$/, "").replace(/\s+/g, " ").trim();

const toSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const PACKS: Pack[] = PACK_FILES.map((file) => {
  const title = toTitle(file);
  return {
    file,
    title,
    slug: toSlug(title),
    maker: "Max for Live",
    format: "Software pack for Ableton Live",
  };
});

const packImage = (file: string) => `/packs/packs_footage/${file}`;

function PacksGrid({ onPackHover }: PacksPageProps) {
  return (
    <main className="packs-page">
      <section className="packs-grid" aria-label="Ableton Packs archive">
        {PACKS.map((pack, index) => (
          <Link
            key={pack.slug}
            to={`/packs/${pack.slug}`}
            className="pack-tile"
            onFocus={() => onPackHover({ slug: pack.slug, title: pack.title })}
            onPointerEnter={() => onPackHover({ slug: pack.slug, title: pack.title })}
          >
            <img src={packImage(pack.file)} alt={pack.title} loading={index < 18 ? "eager" : "lazy"} />
            <span className="pack-tile-meta">
              <span className="mono">{String(index + 1).padStart(2, "0")}</span>
              <span>{pack.title}</span>
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}

function PackDetail() {
  const { packSlug } = useParams();
  const pack = PACKS.find((item) => item.slug === packSlug) ?? PACKS[0];

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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tempor, justo at
              dictum porttitor, eros mi cursus sem, vitae elementum purus mi ac lectus.
            </p>
            <p>
              Designed for sketching, processing and performance inside Live, this pack adds a
              focused set of instruments, devices and sound material to the studio.
            </p>
          </div>
          <div className="pack-detail-footer">
            <span>Requires Live 12 Standard and Max for Live or above.</span>
            <a href="#buy" className="pack-buy-button">
              Buy Now
            </a>
          </div>
        </article>
      </section>
    </main>
  );
}

function PacksPage({ onPackHover }: PacksPageProps) {
  const { packSlug } = useParams();
  if (packSlug) return <PackDetail />;
  return <PacksGrid onPackHover={onPackHover} />;
}

export default PacksPage;
