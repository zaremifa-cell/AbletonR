import type { Metadata } from "next";
import PacksPage from "@/views/PacksPage";

export const metadata: Metadata = {
  title: "Packs",
  description:
    "Browse the Ableton Packs archive: instruments, drum kits, textures and Max for Live devices.",
};

export default function Page() {
  return <PacksPage />;
}
