import type { Metadata } from "next";
import localFont from "next/font/local";
import SiteShell from "@/components/layout/SiteShell";
import "@/styles.css";

const robotoCondensed = localFont({
  src: [
    {
      path: "../../public/fonts/roboto-condensed-300.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/roboto-condensed-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/roboto-condensed-700.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-roboto-condensed",
});

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
      <body className={robotoCondensed.variable}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
