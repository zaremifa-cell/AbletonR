import type { Metadata } from "next";
import { getShopProduct, SHOP_PRODUCTS } from "@/data/products";
import ShopPage from "@/views/ShopPage";

type ProductRouteProps = {
  params: Promise<{ productSlug: string }>;
  searchParams: Promise<{ plan?: string }>;
};

export function generateStaticParams() {
  return SHOP_PRODUCTS.map((product) => ({ productSlug: product.slug }));
}

export async function generateMetadata({ params }: ProductRouteProps): Promise<Metadata> {
  const { productSlug } = await params;
  const product = getShopProduct(productSlug);

  return {
    title: product ? `${product.title} — Shop` : "Shop",
    description: product?.detail ?? "Ableton Programme shop product page.",
  };
}

export default async function Page({ params, searchParams }: ProductRouteProps) {
  const [{ productSlug }, resolvedSearchParams] = await Promise.all([params, searchParams]);

  return (
    <ShopPage
      route="product"
      productSlug={productSlug}
      plan={resolvedSearchParams.plan}
    />
  );
}
