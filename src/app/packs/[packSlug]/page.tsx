import type { Metadata } from "next";
import { PACKS } from "@/data/packs";
import PacksPage from "@/views/PacksPage";

type PackRouteProps = {
  params: Promise<{ packSlug: string }>;
};

export function generateStaticParams() {
  return PACKS.map((pack) => ({ packSlug: pack.slug }));
}

export async function generateMetadata({ params }: PackRouteProps): Promise<Metadata> {
  const { packSlug } = await params;
  const pack = PACKS.find((item) => item.slug === packSlug);

  return {
    title: pack ? `${pack.title} — Packs` : "Packs",
    description: pack
      ? `${pack.title} by ${pack.maker} in the Ableton Programme Packs archive.`
      : "Ableton Programme Packs archive.",
  };
}

export default async function Page({ params }: PackRouteProps) {
  const { packSlug } = await params;
  return <PacksPage packSlug={packSlug} />;
}
