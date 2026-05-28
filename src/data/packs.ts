export type PackSummary = {
  slug: string;
  title: string;
};

export type Pack = PackSummary & {
  file: string;
  maker: string;
  format: string;
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

export const packImage = (file: string) => `/packs/packs_footage/${file}`;
