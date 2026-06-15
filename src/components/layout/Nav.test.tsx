import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Nav from "./Nav";
import { CartProvider } from "@/contexts/CartContext";

describe("Nav", () => {
  it("toggles the mobile product menu from the logo button", async () => {
    const user = userEvent.setup();
    render(
      <CartProvider initialItems={[{ slug: "live-12", quantity: 2 }]}>
        <Nav activePack={null} />
      </CartProvider>
    );

    const button = screen.getByRole("button", { name: /open ableton menu/i });
    await user.click(button);

    expect(screen.getByRole("button", { name: /close ableton menu/i })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(screen.getAllByRole("link", { name: /packs/i })).toHaveLength(2);
  });

  it("reflects the cart count from CartProvider", () => {
    render(
      <CartProvider initialItems={[{ slug: "live-12", quantity: 3 }]}>
        <Nav activePack={null} />
      </CartProvider>
    );

    const cartLink = screen.getByRole("link", { name: /cart/i });
    expect(cartLink).toHaveTextContent("3");
  });
});
