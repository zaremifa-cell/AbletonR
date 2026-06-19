import { render, screen, within } from "@testing-library/react";
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
    const mobileMenu = screen.getByRole("navigation", { name: /mobile product navigation/i });
    expect(within(mobileMenu).getByRole("link", { name: /home/i })).toHaveAttribute("href", "/");
    expect(screen.getAllByRole("link", { name: /packs/i })).toHaveLength(2);
  });

  it("does not mark Home and Learn active at the same time on the home route", async () => {
    window.history.pushState({}, "", "/");
    const user = userEvent.setup();
    render(
      <CartProvider>
        <Nav activePack={null} />
      </CartProvider>
    );

    await user.click(screen.getByRole("button", { name: /open ableton menu/i }));

    const mobileMenu = screen.getByRole("navigation", { name: /mobile product navigation/i });
    expect(within(mobileMenu).getByRole("link", { name: /home/i })).toHaveAttribute("aria-current", "page");
    expect(within(mobileMenu).getByRole("link", { name: /learn/i })).not.toHaveAttribute("aria-current");
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
