import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import "@/styles.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ableton-r.vercel.app"),
  title: {
    default: "Ableton Programme — Portfolio Product Archive",
    template: "%s — Ableton Programme",
  },
  description:
    "Portfolio redesign concept for Ableton presenting Live, Push, Move, Note and Packs as a disciplined product archive built with React, Next.js and TypeScript.",
  openGraph: {
    title: "Ableton Programme",
    description:
      "A portfolio redesign concept for Ableton's music-making ecosystem.",
    url: "https://ableton-r.vercel.app",
    siteName: "Ableton Programme",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ableton Programme",
    description:
      "Portfolio redesign concept for Ableton presenting a precise product archive.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
