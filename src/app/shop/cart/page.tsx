import type { Metadata } from "next";
import ShopPage from "@/features/shop/ShopPage";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your selected products before checkout.",
};

export default function Page() {
  return <ShopPage route="cart" />;
}
