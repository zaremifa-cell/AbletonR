import type { Metadata } from "next";
import ShopPage from "@/views/ShopPage";

export const metadata: Metadata = {
  title: "Account",
  description: "Customer account area for orders, licenses, downloads, and billing information.",
};

export default function Page() {
  return <ShopPage route="account" />;
}
