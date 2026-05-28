import { describe, expect, it } from "vitest";
import { getCartCount, getCartLines, getSubtotal } from "./cart";

describe("cart helpers", () => {
  it("counts quantities across cart items", () => {
    expect(
      getCartCount([
        { slug: "live-12", quantity: 1 },
        { slug: "push", quantity: 2 },
      ])
    ).toBe(3);
  });

  it("builds cart lines and subtotal from product data", () => {
    const items = [
      { slug: "live-12", quantity: 1, option: "Suite" },
      { slug: "packs", quantity: 2 },
      { slug: "missing", quantity: 1 },
    ];

    const lines = getCartLines(items);

    expect(lines).toHaveLength(2);
    expect(lines[0]).toMatchObject({ slug: "live-12", lineTotal: 749 });
    expect(getSubtotal(items)).toBe(907);
  });
});
