import { useEffect } from "react";

const SITE_URL = "https://ableton-r.vercel.app";
const JSON_LD_ID = "ableton-programme-page-jsonld";

type JsonLd = Record<string, unknown> | Record<string, unknown>[];

type PageMeta = {
  title: string;
  description: string;
  /**
   * Canonical path on the site, including the leading slash. Combined with
   * the production site URL to produce an absolute canonical link.
   */
  canonicalPath?: string;
  /**
   * Optional Schema.org JSON-LD payload rendered into a single page-level
   * <script type="application/ld+json"> tag and replaced on every navigation.
   */
  jsonLd?: JsonLd;
};

function upsertMeta(selector: string, attrName: string, attrValue: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaName(name: string, content: string) {
  upsertMeta(`meta[name="${name}"]`, "name", name, content);
}

function setMetaProperty(property: string, content: string) {
  upsertMeta(`meta[property="${property}"]`, "property", property, content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLd(serialized: string) {
  const existing = document.getElementById(JSON_LD_ID);
  if (existing) existing.remove();
  if (!serialized) return;
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = JSON_LD_ID;
  script.textContent = serialized;
  document.head.appendChild(script);
}

export function usePageMeta({
  title,
  description,
  canonicalPath = "/",
  jsonLd,
}: PageMeta) {
  const serializedJsonLd = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    document.title = title;
    setMetaName("description", description);
    setMetaProperty("og:title", title);
    setMetaProperty("og:description", description);
    setMetaProperty("og:url", `${SITE_URL}${canonicalPath}`);
    setMetaName("twitter:title", title);
    setMetaName("twitter:description", description);
    setCanonical(`${SITE_URL}${canonicalPath}`);
    setJsonLd(serializedJsonLd);
  }, [title, description, canonicalPath, serializedJsonLd]);
}

export const SITE_BASE_URL = SITE_URL;
