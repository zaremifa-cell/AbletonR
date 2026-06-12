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
      { slug: "max-for-live", quantity: 2, option: "Max for Live" },
      { slug: "missing", quantity: 1 },
    ];

    const lines = getCartLines(items);

    expect(lines).toHaveLength(2);
    expect(lines[0]).toMatchObject({ slug: "live-12", unitPrice: 599, lineTotal: 599 });
    expect(lines[1]).toMatchObject({ slug: "max-for-live", unitPrice: 149, lineTotal: 298 });
    expect(getSubtotal(items)).toBe(897);
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

  it("does not add shipping for digital or download-only products", () => {
    expect(getEstimatedShipping([{ slug: "live-12", quantity: 1 }])).toBe(0);
    expect(getEstimatedShipping([{ slug: "64-pad-lab", quantity: 1 }])).toBe(0);
    expect(getEstimatedShipping([{ slug: "packs", quantity: 1 }])).toBe(0);
    expect(getEstimatedShipping([{ slug: "max-for-live", quantity: 1 }])).toBe(0);
    expect(getEstimatedShipping([{ slug: "merchandise", quantity: 1 }])).toBe(0);
  });

  it("adds shipping for Push or Move physical products", () => {
    expect(getEstimatedShipping([{ slug: "push", quantity: 1 }])).toBe(24);
    expect(getEstimatedShipping([{ slug: "move", quantity: 1 }])).toBe(24);
    expect(
      getEstimatedShipping([
        { slug: "64-pad-lab", quantity: 1 },
        { slug: "push", quantity: 1 },
      ])
    ).toBe(24);
  });
});
