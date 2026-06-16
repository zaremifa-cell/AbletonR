import { expect, test, type Page, type Response } from "@playwright/test";

import { PACKS } from "../src/data/packs";
import { PACK_SHOP_PRODUCTS, SHOP_PRODUCTS } from "../src/data/products";

const coreRoutes = [
  "/",
  "/live",
  "/live-experiment",
  "/push",
  "/move",
  "/note",
  "/rent-to-own",
  "/packs",
  "/shop",
  "/shop/cart",
  "/shop/checkout",
  "/shop/account",
];

const packRoutes = PACKS.map((pack) => `/packs/${pack.slug}`);
const productRoutes = [...SHOP_PRODUCTS, ...PACK_SHOP_PRODUCTS].map(
  (product) => `/shop/product/${product.slug}`
);

const routes = [...new Set([...coreRoutes, ...packRoutes, ...productRoutes])];

type AuditFinding = {
  route: string;
  type: string;
  detail: string;
};

const ignoredConsoleFragments = [
  "Download the React DevTools",
  "Failed to load resource: the server responded with a status of 404",
  "NEXT_REDIRECT",
];

const isRelevantResponseFailure = (response: Response) => {
  const url = response.url();

  if (!url.startsWith("http://127.0.0.1:3000")) {
    return false;
  }

  return response.status() >= 400;
};

async function collectAuditFindings(page: Page, route: string) {
  const findings: AuditFinding[] = [];

  page.on("console", (message) => {
    if (message.type() !== "error") {
      return;
    }

    const text = message.text();
    if (ignoredConsoleFragments.some((fragment) => text.includes(fragment))) {
      return;
    }

    findings.push({
      route,
      type: "console-error",
      detail: text,
    });
  });

  page.on("pageerror", (error) => {
    findings.push({
      route,
      type: "page-error",
      detail: error.message,
    });
  });

  page.on("response", (response) => {
    if (!isRelevantResponseFailure(response)) {
      return;
    }

    findings.push({
      route,
      type: "failed-response",
      detail: `${response.status()} ${response.url()}`,
    });
  });

  const response = await page.goto(route, { waitUntil: "networkidle" });
  const status = response?.status() ?? 0;

  if (status >= 400 || status === 0) {
    findings.push({
      route,
      type: "document-status",
      detail: `${status} ${route}`,
    });
  }

  await page.waitForTimeout(250);

  const pageState = await page.evaluate(() => {
    const text = document.body.innerText.trim();
    const html = document.documentElement;
    const body = document.body;
    const maxScrollWidth = Math.max(html.scrollWidth, body.scrollWidth);
    const viewportWidth = html.clientWidth;
    const overlayText = text.toLowerCase();

    return {
      title: document.title,
      textLength: text.length,
      horizontalOverflow: Math.max(0, maxScrollWidth - viewportWidth),
      hasFrameworkOverlay:
        overlayText.includes("next.js") &&
        (overlayText.includes("runtime error") ||
          overlayText.includes("application error") ||
          overlayText.includes("hydration")),
    };
  });

  if (pageState.textLength < 40) {
    findings.push({
      route,
      type: "blank-page",
      detail: `Only ${pageState.textLength} visible text characters rendered.`,
    });
  }

  if (pageState.hasFrameworkOverlay) {
    findings.push({
      route,
      type: "framework-overlay",
      detail: "Possible Next.js error overlay rendered.",
    });
  }

  if (pageState.horizontalOverflow > 4) {
    findings.push({
      route,
      type: "horizontal-overflow",
      detail: `Document is ${pageState.horizontalOverflow}px wider than the viewport.`,
    });
  }

  await expect(page).toHaveTitle(/Ableton/i);

  return findings;
}

test.describe("portfolio route audit", () => {
  for (const route of routes) {
    test(`${route} renders without critical UI errors`, async ({ page }, testInfo) => {
      const findings = await collectAuditFindings(page, route);

      if (findings.length > 0) {
        await testInfo.attach("audit-findings", {
          body: JSON.stringify(findings, null, 2),
          contentType: "application/json",
        });
      }

      expect(findings).toEqual([]);
    });
  }
});
