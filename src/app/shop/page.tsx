import type { Metadata } from "next";
import ShopPage from "@/features/shop/ShopPage";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse the Ableton Programme shop: Live, Push, Move, Packs, education offers and selected merchandise.",
};

export default function Page() {
  return <ShopPage route="shop" />;
}
