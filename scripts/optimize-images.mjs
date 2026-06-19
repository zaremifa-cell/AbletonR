#!/usr/bin/env node
/**
 * Generates .webp companions next to every .jpg/.png in public/.
 * Originals are kept intact so React markup can use <picture> with a
 * .webp <source> and the original as the fallback <img>.
 *
 * Run with: npm run optimize:images
 */
import { readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, parse, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PUBLIC_DIR = join(ROOT, "public");

const MIN_SIZE_BYTES = 0;
const JPG_QUALITY = 82;
const PNG_QUALITY = 88;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (entry.isFile()) {
      files.push(full);
    }
  }
  return files;
}

function shouldConvert(file) {
  const lower = file.toLowerCase();
  return lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".png");
}

function webpTarget(file) {
  const parsed = parse(file);
  return join(parsed.dir, `${parsed.name}.webp`);
}

async function main() {
  const files = (await walk(PUBLIC_DIR)).filter(shouldConvert);
  let convertedCount = 0;
  let skippedSmall = 0;
  let skippedExisting = 0;
  let originalBytes = 0;
  let webpBytes = 0;

  for (const file of files) {
    const target = webpTarget(file);
    const info = await stat(file);

    if (info.size < MIN_SIZE_BYTES) {
      skippedSmall++;
      continue;
    }

    if (existsSync(target)) {
      const existing = await stat(target);
      if (existing.mtimeMs >= info.mtimeMs) {
        skippedExisting++;
        originalBytes += info.size;
        webpBytes += existing.size;
        continue;
      }
    }

    const isPng = file.toLowerCase().endsWith(".png");
    await sharp(file)
      .webp({
        quality: isPng ? PNG_QUALITY : JPG_QUALITY,
        effort: 5,
      })
      .toFile(target);

    const newInfo = await stat(target);
    originalBytes += info.size;
    webpBytes += newInfo.size;
    convertedCount++;

    const rel = relative(ROOT, file);
    const saved = (1 - newInfo.size / info.size) * 100;
    console.log(`  webp  ${rel}  (${(info.size / 1024).toFixed(0)}KB -> ${(newInfo.size / 1024).toFixed(0)}KB, -${saved.toFixed(0)}%)`);
  }

  const total = (originalBytes + webpBytes) > 0 ? (1 - webpBytes / originalBytes) * 100 : 0;
  console.log("");
  console.log(`Converted:    ${convertedCount}`);
  console.log(`Skipped small (<${MIN_SIZE_BYTES / 1024}KB): ${skippedSmall}`);
  console.log(`Skipped existing: ${skippedExisting}`);
  console.log(`Original tracked total: ${(originalBytes / (1024 * 1024)).toFixed(1)} MB`);
  console.log(`WebP tracked total:     ${(webpBytes / (1024 * 1024)).toFixed(1)} MB`);
  console.log(`Savings: ${total.toFixed(1)}%`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
