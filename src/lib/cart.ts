import { getShopProduct, type ShopProduct } from "@/data/products";

export type CartItem = {
  slug: string;
  quantity: number;
  option?: string;
};

export type AddToCartInput = {
  slug: string;
  quantity?: number;
  option?: string;
};

export type CartLine = CartItem & {
  product: ShopProduct;
  lineTotal: number;
};

export const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const getCartCount = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.quantity, 0);

export const getCartLines = (items: CartItem[]) =>
  items.reduce<CartLine[]>((lines, item) => {
    const product = getShopProduct(item.slug);
    if (!product) return lines;
    lines.push({ ...item, product, lineTotal: product.price * item.quantity });
    return lines;
  }, []);

export const getSubtotal = (items: CartItem[]) =>
  getCartLines(items).reduce((total, item) => total + item.lineTotal, 0);
