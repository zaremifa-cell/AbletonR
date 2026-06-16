import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { type AddToCartInput, type CartItem, getCartLines } from "@/lib/cart";

const STORAGE_KEY = "ableton-shop-cart";
const CHANNEL_NAME = "ableton-shop-cart-sync";

type CartContextValue = {
  items: CartItem[];
  count: number;
  addToCart: (input: AddToCartInput) => void;
  updateCart: (slug: string, quantity: number, option?: string) => void;
  removeFromCart: (slug: string, option?: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStoredItems(raw: string | null): CartItem[] {
  try {
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
  const [items, setItems] = useState<CartItem[]>(() => initialItems ?? []);
  const [isStorageReady, setIsStorageReady] = useState(initialItems !== undefined);
  const instanceId = useId();
  const serializedItemsRef = useRef(JSON.stringify(items));

  useEffect(() => {
    if (typeof window === "undefined" || initialItems !== undefined) return;

    const storedItems = readStoredItems(window.localStorage.getItem(STORAGE_KEY));
    serializedItemsRef.current = JSON.stringify(storedItems);
    setItems(storedItems);
    setIsStorageReady(true);
  }, [initialItems]);

  useEffect(() => {
    if (typeof window === "undefined" || !isStorageReady) return;
    const serialized = JSON.stringify(items);
    serializedItemsRef.current = serialized;
    try {
      window.localStorage.setItem(STORAGE_KEY, serialized);
    } catch {
      // localStorage may be unavailable (private mode, quota); ignore.
    }

    if ("BroadcastChannel" in window && initialItems === undefined) {
      const channel = new BroadcastChannel(CHANNEL_NAME);
      channel.postMessage({ source: instanceId, items: serialized });
      channel.close();
    }
  }, [initialItems, instanceId, isStorageReady, items]);

  useEffect(() => {
    if (typeof window === "undefined" || initialItems !== undefined || !isStorageReady) return;

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      if ((event.newValue ?? "[]") === serializedItemsRef.current) return;
      serializedItemsRef.current = event.newValue ?? "[]";
      setItems(readStoredItems(event.newValue));
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [initialItems, isStorageReady]);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      initialItems !== undefined ||
      !isStorageReady ||
      !("BroadcastChannel" in window)
    ) {
      return;
    }

    const channel = new BroadcastChannel(CHANNEL_NAME);
    channel.onmessage = (event: MessageEvent<{ source?: string; items?: string }>) => {
      if (event.data?.source === instanceId || !event.data?.items) return;
      if (event.data.items === serializedItemsRef.current) return;
      serializedItemsRef.current = event.data.items;
      setItems(readStoredItems(event.data.items));
    };

    return () => channel.close();
  }, [initialItems, instanceId, isStorageReady]);

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
