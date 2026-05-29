import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { type AddToCartInput, type CartItem, getCartLines } from "@/lib/cart";

const STORAGE_KEY = "ableton-shop-cart";

type CartContextValue = {
  items: CartItem[];
  count: number;
  addToCart: (input: AddToCartInput) => void;
  updateCart: (slug: string, quantity: number, option?: string) => void;
  removeFromCart: (slug: string, option?: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readInitialItems(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

type CartProviderProps = {
  children: ReactNode;
  /**
   * Pre-seeds the cart instead of reading from localStorage.
   * Intended for tests and Storybook stories so they can render
   * deterministic states without touching real persistent storage.
   */
  initialItems?: CartItem[];
};

export function CartProvider({ children, initialItems }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>(
    () => initialItems ?? readInitialItems()
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage may be unavailable (private mode, quota); ignore.
    }
  }, [items]);

  const addToCart = useCallback(({ slug, quantity = 1, option }: AddToCartInput) => {
    setItems((current) => {
      const existing = current.find(
        (item) => item.slug === slug && item.option === option
      );
      if (existing) {
        return current.map((item) =>
          item.slug === slug && item.option === option
            ? { ...item, quantity: Math.min(9, item.quantity + quantity) }
            : item
        );
      }
      return [...current, { slug, quantity: Math.min(9, quantity), option }];
    });
  }, []);

  const updateCart = useCallback(
    (slug: string, quantity: number, option?: string) => {
      if (quantity <= 0) {
        setItems((current) =>
          current.filter((item) => !(item.slug === slug && item.option === option))
        );
        return;
      }

      setItems((current) =>
        current.map((item) =>
          item.slug === slug && item.option === option
            ? { ...item, quantity: Math.min(9, quantity) }
            : item
        )
      );
    },
    []
  );

  const removeFromCart = useCallback((slug: string, option?: string) => {
    setItems((current) =>
      current.filter((item) => !(item.slug === slug && item.option === option))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: getCartLines(items).reduce((total, item) => total + item.quantity, 0),
      addToCart,
      updateCart,
      removeFromCart,
      clearCart,
    }),
    [items, addToCart, updateCart, removeFromCart, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return ctx;
}
