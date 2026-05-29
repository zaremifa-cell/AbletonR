import { act, render, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { ReactNode } from "react";
import { CartProvider, useCart } from "./CartContext";

const STORAGE_KEY = "ableton-shop-cart";

function wrap(initialItems?: { slug: string; quantity: number; option?: string }[]) {
  return ({ children }: { children: ReactNode }) => (
    <CartProvider initialItems={initialItems}>{children}</CartProvider>
  );
}

describe("CartContext", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("starts empty when no initialItems are provided and no localStorage exists", () => {
    const { result } = renderHook(() => useCart(), { wrapper: wrap() });
    expect(result.current.items).toEqual([]);
    expect(result.current.count).toBe(0);
  });

  it("hydrates from localStorage when no initialItems are passed", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([{ slug: "live-12", quantity: 2 }])
    );
    const { result } = renderHook(() => useCart(), { wrapper: wrap() });
    expect(result.current.items).toEqual([{ slug: "live-12", quantity: 2 }]);
    expect(result.current.count).toBe(2);
  });

  it("prefers initialItems over localStorage", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([{ slug: "from-storage", quantity: 5 }])
    );
    const { result } = renderHook(() => useCart(), {
      wrapper: wrap([{ slug: "live-12", quantity: 1 }]),
    });
    expect(result.current.items).toEqual([{ slug: "live-12", quantity: 1 }]);
  });

  it("adds, increments, updates and removes items", () => {
    const { result } = renderHook(() => useCart(), { wrapper: wrap() });

    act(() => result.current.addToCart({ slug: "live-12" }));
    expect(result.current.items).toEqual([{ slug: "live-12", quantity: 1, option: undefined }]);

    act(() => result.current.addToCart({ slug: "live-12", quantity: 2 }));
    expect(result.current.items[0].quantity).toBe(3);

    act(() => result.current.updateCart("live-12", 7));
    expect(result.current.items[0].quantity).toBe(7);

    act(() => result.current.updateCart("live-12", 0));
    expect(result.current.items).toEqual([]);

    act(() => result.current.addToCart({ slug: "live-12" }));
    act(() => result.current.removeFromCart("live-12"));
    expect(result.current.items).toEqual([]);
  });

  it("does not count stale cart items that are no longer visible in the cart", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: wrap([{ slug: "missing", quantity: 3 }]),
    });

    expect(result.current.items).toEqual([{ slug: "missing", quantity: 3 }]);
    expect(result.current.count).toBe(0);
  });

  it("caps quantity at 9 on add and update", () => {
    const { result } = renderHook(() => useCart(), { wrapper: wrap() });

    act(() => result.current.addToCart({ slug: "live-12", quantity: 50 }));
    expect(result.current.items[0].quantity).toBe(9);

    act(() => result.current.updateCart("live-12", 1000));
    expect(result.current.items[0].quantity).toBe(9);
  });

  it("treats options as part of the cart line identity", () => {
    const { result } = renderHook(() => useCart(), { wrapper: wrap() });

    act(() => result.current.addToCart({ slug: "live-12", option: "Suite" }));
    act(() => result.current.addToCart({ slug: "live-12", option: "Standard" }));

    expect(result.current.items).toHaveLength(2);
  });

  it("persists changes to localStorage on every update", () => {
    const { result } = renderHook(() => useCart(), { wrapper: wrap() });

    act(() => result.current.addToCart({ slug: "live-12", quantity: 2 }));
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    expect(stored).toEqual([{ slug: "live-12", quantity: 2, option: undefined }]);
  });

  it("clears the cart", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: wrap([{ slug: "live-12", quantity: 1 }]),
    });

    act(() => result.current.clearCart());
    expect(result.current.items).toEqual([]);
    expect(result.current.count).toBe(0);
  });

  it("throws a clear error when used outside CartProvider", () => {
    const spy = vitestSilenceErrors();
    expect(() =>
      render(<UseCartProbe />)
    ).toThrow(/useCart must be used inside a CartProvider/);
    spy.restore();
  });
});

function UseCartProbe() {
  useCart();
  return null;
}

function vitestSilenceErrors() {
  const original = console.error;
  console.error = () => {};
  return {
    restore: () => {
      console.error = original;
    },
  };
}
