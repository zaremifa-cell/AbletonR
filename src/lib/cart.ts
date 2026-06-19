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
  unitPrice: number;
  lineTotal: number;
};

export const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);

export const getCartCount = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.quantity, 0);

export const getCartLines = (items: CartItem[]) =>
  items.reduce<CartLine[]>((lines, item) => {
    const product = getShopProduct(item.slug);
    if (!product) return lines;
    const selectedOption = product.options?.find((option) => option.label === item.option);
    const unitPrice = selectedOption?.price ?? product.price;
    lines.push({ ...item, product, unitPrice, lineTotal: unitPrice * item.quantity });
    return lines;
  }, []);

export const getSubtotal = (items: CartItem[]) =>
  getCartLines(items).reduce((total, item) => total + item.lineTotal, 0);

export const getEstimatedShipping = (items: CartItem[]) =>
  getCartLines(items).some((line) => line.product.requiresShipping) ? 24 : 0;
