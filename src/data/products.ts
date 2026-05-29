import { PACKS, packImage } from "@/data/packs";

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
  requiresShipping?: boolean;
};

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    slug: "live-12",
    title: "Live 12",
    category: "Live",
    description: "The central Ableton software instrument for composing, recording, and performing.",
    price: 749,
    priceLabel: "From $99",
    image: "/live.webp",
    detail:
      "Live 12 is the software layer of the Ableton system: Session View, Arrangement View, instruments, effects, and a workflow built for non-linear music making.",
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
    image: "/push/Push3 product.webp",
    detail:
      "Push turns Live into an instrument you can touch, with expressive pads, screen-led control, and standalone options.",
    meta: ["Ships from the catalogue flow", "Standalone option available", "USB-C connection"],
    options: ["Tethered", "Standalone"],
    requiresShipping: true,
  },
  {
    slug: "move",
    title: "Move",
    category: "Move",
    description: "Portable standalone sketching for fast ideas away from the studio.",
    price: 449,
    priceLabel: "$449",
    image: "/move/hero-girl.webp",
    detail:
      "Move is a compact instrument for starting ideas anywhere, then sending sketches into Ableton Cloud and Live.",
    meta: ["Hardware shipping item", "Includes Live Intro", "Battery powered"],
    options: ["Move", "Move with protective case"],
    requiresShipping: true,
  },
  {
    slug: "packs",
    title: "Packs",
    category: "Packs",
    description: "A curated software sound and device bundle for Live and Max for Live.",
    price: 79,
    priceLabel: "From $79",
    image: "/packs/packs_footage/Tape.webp",
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
    priceLabel: "Free app",
    image: "/note.webp",
    detail: "Note captures musical ideas on iPhone and iPad, then sends them into Ableton Cloud and Live.",
    meta: ["iOS app", "Ableton Cloud workflow", "Mobile capture"],
    options: ["Note app"],
  },
  {
    slug: "merchandise",
    title: "Merchandise",
    category: "Merchandise",
    description: "Selected apparel and studio objects for the Ableton ecosystem.",
    price: 49,
    priceLabel: "From $49",
    image: "/artist-fl.webp",
    detail: "A restrained merchandise capsule for the Ableton product system.",
    meta: ["Selected studio objects", "Size selection", "Portfolio checkout flow"],
    options: ["T-shirt", "Tote", "Poster"],
    requiresShipping: true,
  },
];

export const PACK_SHOP_PRODUCTS: ShopProduct[] = PACKS.map((pack) => ({
  slug: pack.slug,
  title: pack.title,
  category: "Packs",
  description: "A focused software sound and device pack for Ableton Live.",
  price: pack.price,
  priceLabel: pack.priceLabel,
  image: packImage(pack.file),
  detail:
    "A focused sound and device collection for building sketches quickly, then shaping them into finished Live sets with a clear studio workflow.",
  meta: [pack.format, "Download content", "Requires Live 12 Standard and Max for Live or above"],
  options: [pack.title],
  requiresShipping: false,
}));

export const getShopProduct = (slug: string) =>
  SHOP_PRODUCTS.find((product) => product.slug === slug) ??
  PACK_SHOP_PRODUCTS.find((product) => product.slug === slug);
