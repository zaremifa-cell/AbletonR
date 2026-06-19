export type PackSummary = {
  slug: string;
  title: string;
};

export type Pack = PackSummary & {
  file: string;
  maker: string;
  format: string;
  price: number;
  priceLabel: string;
};

const PACK_FILES = [
  "64 Pad Lab.webp",
  "Acid Rain Technology Maestro.webp",
  "Alter Echo.webp",
  "Analogik Drums.webp",
  "Analogik Waves.webp",
  "Cinematic Percussion.webp",
  "Color Limiter.webp",
  "DS Kick.webp",
  "Destiny Plus Programma 900.webp",
  "Experimental Game Grid.webp",
  "Filament 1.0.webp",
  "Game Boy Advance.png",
  "Holder.webp",
  "MSI-001 Signal Processor .webp",
  "Metropolis Sequencer.webp",
  "Microtron.webp",
  "OSCiLLOT.webp",
  "Oto Machines Bam.webp",
  "pitch-hack.webp",
  "STING.gif",
  "Soilturner 2.0",
  "Speaker.webp",
  "Spiritualized.webp",
  "Synthesis AI006.webp",
  "Tape.webp",
  "This paper.webp",
  "Tonverk.webp",
  "analog.webp",
  "erbenerb.webp",
  "issue 6.webp",
  "knobs.webp",
  "mode amp.webp",
  "morph addign.webp",
  "obj 02.webp",
  "superlunar sr-03.webp",
  "wavetable oscilator.webp",
];

const PACK_PRICES = [
  49, 29, 39, 35, 32, 59, 24, 20, 54, 42, 45, 28,
  31, 38, 57, 26, 44, 36, 22, 33, 41, 25, 52, 48,
  30, 55, 46, 21, 34, 27, 23, 37, 40, 43, 50, 60,
];

const toTitle = (file: string) => file.replace(/\.[^/.]+$/, "").replace(/\s+/g, " ").trim();

const toSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const PACKS: Pack[] = PACK_FILES.map((file, index) => {
  const title = toTitle(file);
  const price = PACK_PRICES[index] ?? 49;
  return {
    file,
    title,
    slug: toSlug(title),
    maker: "Max for Live",
    format: "Software pack for Ableton Live",
    price,
    priceLabel: `€${price}`,
  };
});

export const packImage = (file: string) => `/packs/packs_footage/${file}`;
