import type { Metadata } from "next";
import ShopPage from "@/views/ShopPage";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete the portfolio checkout flow and review the order summary.",
};

export default function Page() {
  return <ShopPage route="checkout" />;
}
