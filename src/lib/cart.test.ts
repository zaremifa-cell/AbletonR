import { describe, expect, it } from "vitest";
import { getCartCount, getCartLines, getEstimatedShipping, getSubtotal } from "./cart";

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

  it("builds cart lines for individual Packs archive items", () => {
    const lines = getCartLines([{ slug: "64-pad-lab", quantity: 1, option: "64 Pad Lab" }]);

    expect(lines).toHaveLength(1);
    expect(lines[0]).toMatchObject({
      slug: "64-pad-lab",
      lineTotal: 49,
      product: {
        title: "64 Pad Lab",
        priceLabel: "€49",
      },
    });
  });

  it("does not add shipping for download-only Packs", () => {
    expect(getEstimatedShipping([{ slug: "64-pad-lab", quantity: 1 }])).toBe(0);
    expect(getEstimatedShipping([{ slug: "packs", quantity: 1 }])).toBe(0);
  });

  it("adds shipping when a physical product is in the cart", () => {
    expect(
      getEstimatedShipping([
        { slug: "64-pad-lab", quantity: 1 },
        { slug: "push", quantity: 1 },
      ])
    ).toBe(24);
  });
});
