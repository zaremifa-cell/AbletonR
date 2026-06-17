import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { CartProvider } from "@/contexts/CartContext";
import type { CartItem } from "@/lib/cart";
import { mockRouterPush } from "@/test/setup";
import ShopPage from "./ShopPage";

function renderShop(route: string, initialItems: CartItem[] = []) {
  const url = new URL(route, "http://localhost");
  window.history.pushState({}, "", `${url.pathname}${url.search}`);
  const productMatch = url.pathname.match(/^\/shop\/product\/([^/]+)$/);
  const routeProp = url.pathname.endsWith("/cart")
    ? "cart"
    : url.pathname.endsWith("/checkout")
      ? "checkout"
      : url.pathname.endsWith("/account")
        ? "account"
        : productMatch
          ? "product"
          : "shop";

  return render(
    <CartProvider initialItems={initialItems}>
      <ShopPage
        route={routeProp}
        productSlug={productMatch?.[1]}
        plan={url.searchParams.get("plan") ?? undefined}
      />
    </CartProvider>
  );
}

function summaryValue(summary: HTMLElement, label: RegExp) {
  const term = within(summary).getByText(label);
  return term.nextElementSibling;
}

async function completeCheckoutForms(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/email address/i), "artist@example.com");
  await user.type(screen.getByLabelText(/phone number/i), "+359 888 123 456");
  await user.click(screen.getByRole("button", { name: /continue/i }));

  await user.type(screen.getByLabelText(/full name/i), "Zlatko Anastasov");
  await user.type(screen.getByLabelText(/^address$/i), "1 Studio Street");
  await user.type(screen.getByLabelText(/^city$/i), "Sofia");
  await user.type(screen.getByLabelText(/^country$/i), "Bulgaria");
  await user.type(screen.getByLabelText(/postal code/i), "1000");
  await user.click(screen.getByRole("button", { name: /continue/i }));

  await user.type(screen.getByLabelText(/name on card/i), "Zlatko Anastasov");
  await user.type(screen.getByLabelText(/card number/i), "4242424242424242");
  await user.type(screen.getByLabelText(/expiry/i), "12/29");
  await user.type(screen.getByLabelText(/security code/i), "123");
  await user.click(screen.getByRole("button", { name: /continue/i }));
}

describe("Shop cart and checkout flows", () => {
  beforeEach(() => {
    window.localStorage.clear();
    mockRouterPush.mockClear();
  });

  it("shows no estimated shipping for digital cart products", () => {
    renderShop("/shop/cart", [
      { slug: "live-12", quantity: 1, option: "Suite" },
      { slug: "max-for-live", quantity: 1, option: "Max for Live" },
    ]);

    const summary = screen.getByRole("complementary");
    expect(summaryValue(summary, /estimated shipping/i)).toHaveTextContent("€0");
    expect(summaryValue(summary, /^total$/i)).toHaveTextContent("€808");
  });

  it("adds estimated shipping when Push or Move is in the cart", () => {
    renderShop("/shop/cart", [
      { slug: "push", quantity: 1, option: "Tethered" },
      { slug: "move", quantity: 1, option: "Move" },
    ]);

    const summary = screen.getByRole("complementary");
    expect(summaryValue(summary, /estimated shipping/i)).toHaveTextContent("€24");
    expect(summaryValue(summary, /^total$/i)).toHaveTextContent("€1,588");
  });

  it("removes individual cart lines and clears the full cart", async () => {
    const user = userEvent.setup();
    renderShop("/shop/cart", [
      { slug: "live-12", quantity: 1, option: "Suite" },
      { slug: "push", quantity: 1, option: "Tethered" },
    ]);

    await user.click(screen.getAllByRole("button", { name: /remove/i })[0]);

    expect(screen.queryByRole("heading", { name: /live 12/i })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /push/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /clear cart/i }));

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /push/i })).not.toBeInTheDocument();
  });

  it("adds a selected Push option to the cart from the custom product option menu", async () => {
    const user = userEvent.setup();
    renderShop("/shop/product/push");

    await user.click(screen.getByRole("button", { name: /tethered/i }));
    await user.click(screen.getByRole("option", { name: /standalone/i }));
    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(mockRouterPush).toHaveBeenCalledWith("/shop/cart");
  });

  it("links the Live shop card Add to cart action to the product option screen", async () => {
    const user = userEvent.setup();
    const landing = renderShop("/shop");

    const liveCard = screen.getByRole("heading", { name: /^live 12$/i }).closest("article");
    expect(liveCard).not.toBeNull();

    expect(within(liveCard as HTMLElement).getByRole("link", { name: /add to cart/i })).toHaveAttribute(
      "href",
      "/shop/product/live-12"
    );
    landing.unmount();

    renderShop("/shop/product/live-12");
    expect(screen.getByRole("heading", { name: /^live 12$/i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /intro/i }));
    expect(screen.getByRole("option", { name: /standard/i })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /suite/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view cart/i })).toBeInTheDocument();
  });

  it("allows rent-to-own only for Live 12 Suite", async () => {
    const user = userEvent.setup();
    renderShop("/shop/product/live-12?plan=rent-to-own");

    expect(screen.getByText(/€24.96 \/ mo\./i)).toBeInTheDocument();
    expect(screen.getByText(/rent-to-own for 24 months/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /suite \(rent-to-own\)/i }));

    expect(screen.getByRole("option", { name: /intro/i })).toBeDisabled();
    expect(screen.getByRole("option", { name: /standard/i })).toBeDisabled();
    expect(screen.getByRole("option", { name: /suite/i })).toHaveAttribute("aria-selected", "true");

    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(mockRouterPush).toHaveBeenCalledWith("/shop/cart");
  });

  it("routes the Packs shop card to the Packs archive instead of adding a bundle directly", () => {
    renderShop("/shop");

    const packsCard = screen.getByRole("heading", { name: /^packs$/i }).closest("article");
    expect(packsCard).not.toBeNull();

    expect(within(packsCard as HTMLElement).getByRole("link", { name: /add to cart/i })).toHaveAttribute(
      "href",
      "/packs"
    );
  });

  it("does not show Merchandise in the Shop product rail", () => {
    renderShop("/shop");

    expect(screen.queryByRole("heading", { name: /merchandise/i })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /max for live/i })).toBeInTheDocument();
  });

  it("requires valid checkout data before completing and clearing the cart", async () => {
    const user = userEvent.setup();
    renderShop("/shop/checkout", [{ slug: "live-12", quantity: 1, option: "Suite" }]);

    expect(screen.getByRole("button", { name: /continue/i })).toBeDisabled();

    await completeCheckoutForms(user);
    expect(screen.getByRole("heading", { name: /review order/i })).toBeInTheDocument();
    expect(screen.getByText(/1 x live 12/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /continue/i }));
    expect(screen.getByRole("button", { name: /place order/i })).toBeEnabled();

    await user.click(screen.getByRole("button", { name: /place order/i }));
    expect(screen.getByRole("heading", { name: /order flow complete/i })).toBeInTheDocument();
  });

  it("requires email and password before entering the account area", async () => {
    const user = userEvent.setup();
    renderShop("/shop/account");

    const loginSection = screen.getByRole("region", { name: /log in/i });
    const loginButton = within(loginSection).getByRole("button", { name: /log in/i });
    expect(loginButton).toBeDisabled();

    await user.type(
      within(loginSection).getByLabelText(/e-mail or username/i),
      "artist@example.com"
    );
    await user.type(within(loginSection).getByLabelText(/password/i), "portfolio-pass");
    await user.click(loginButton);

    expect(screen.getByRole("navigation", { name: /account sections/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log out/i })).toBeInTheDocument();
  });

  it("creates an account from the register panel", async () => {
    const user = userEvent.setup();
    renderShop("/shop/account");

    const registerSection = screen.getByRole("region", { name: /register/i });
    const createButton = within(registerSection).getByRole("button", { name: /create account/i });
    expect(createButton).toBeDisabled();

    await user.type(within(registerSection).getByLabelText(/^email$/i), "new.artist@example.com");
    await user.type(within(registerSection).getByLabelText(/^password$/i), "new-password");
    await user.click(createButton);

    expect(screen.getByRole("heading", { name: /^licenses$/i })).toBeInTheDocument();
    expect(screen.getByText(/no licenses registered/i)).toBeInTheDocument();
    expect(screen.getByText(/no packs attached/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^packs$/i })).toBeInTheDocument();
    expect(screen.queryByText(/free live 12 trial/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /download/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/no orders yet/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/serial ending/i)).not.toBeInTheDocument();
  });

  it("hides sensitive account personal details and resets to login on logout", async () => {
    const user = userEvent.setup();
    renderShop("/shop/account");

    const loginSection = screen.getByRole("region", { name: /log in/i });
    await user.type(
      within(loginSection).getByLabelText(/e-mail or username/i),
      "artist@example.com"
    );
    await user.type(within(loginSection).getByLabelText(/password/i), "portfolio-pass");
    await user.click(within(loginSection).getByRole("button", { name: /log in/i }));
    await user.click(screen.getByRole("button", { name: /personal details/i }));

    expect(screen.getByRole("heading", { name: /email address/i })).toBeInTheDocument();
    expect(screen.getAllByText(/not added/i).length).toBeGreaterThan(1);
    expect(screen.getByText(/no subscriptions selected/i)).toBeInTheDocument();
    expect(screen.queryByText(/@/)).not.toBeInTheDocument();
    expect(screen.queryByText(/visa ending/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /log out/i }));

    expect(screen.getByRole("heading", { name: /^log in$/i, level: 1 })).toBeInTheDocument();
    expect(
      within(screen.getByRole("region", { name: /log in/i })).getByRole("button", {
        name: /log in/i,
      })
    ).toBeDisabled();
  });

  it("shows an empty order-history table without fake purchases", async () => {
    const user = userEvent.setup();
    renderShop("/shop/account");

    const loginSection = screen.getByRole("region", { name: /log in/i });
    await user.type(
      within(loginSection).getByLabelText(/e-mail or username/i),
      "artist@example.com"
    );
    await user.type(within(loginSection).getByLabelText(/password/i), "portfolio-pass");
    await user.click(within(loginSection).getByRole("button", { name: /log in/i }));
    await user.click(screen.getByRole("button", { name: /order history/i }));

    expect(screen.getByRole("columnheader", { name: /date/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /reference/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /products/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /total \/ invoice/i })).toBeInTheDocument();
    expect(screen.getByText(/no orders yet/i)).toBeInTheDocument();
    expect(screen.queryByText(/invoice #/i)).not.toBeInTheDocument();
  });

  it("stores completed orders only for the active local account", async () => {
    const user = userEvent.setup();
    const firstAccount = renderShop("/shop/account");

    let loginSection = screen.getByRole("region", { name: /log in/i });
    await user.type(
      within(loginSection).getByLabelText(/e-mail or username/i),
      "first@example.com"
    );
    await user.type(within(loginSection).getByLabelText(/password/i), "portfolio-pass");
    await user.click(within(loginSection).getByRole("button", { name: /log in/i }));
    firstAccount.unmount();

    const checkout = renderShop("/shop/checkout", [
      { slug: "live-12", quantity: 1, option: "Suite" },
    ]);
    await completeCheckoutForms(user);
    await user.click(screen.getByRole("button", { name: /continue/i }));
    await user.click(screen.getByRole("button", { name: /place order/i }));
    expect(screen.getByRole("heading", { name: /order flow complete/i })).toBeInTheDocument();
    checkout.unmount();

    const firstHistory = renderShop("/shop/account");
    await user.click(screen.getByRole("button", { name: /order history/i }));
    expect(screen.getByText(/1 x live 12/i)).toBeInTheDocument();
    expect(screen.getByText(/local-/i)).toBeInTheDocument();
    expect(screen.getByText("€647")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /log out/i }));
    firstHistory.unmount();

    renderShop("/shop/account");
    loginSection = screen.getByRole("region", { name: /log in/i });
    await user.type(
      within(loginSection).getByLabelText(/e-mail or username/i),
      "second@example.com"
    );
    await user.type(within(loginSection).getByLabelText(/password/i), "portfolio-pass");
    await user.click(within(loginSection).getByRole("button", { name: /log in/i }));
    await user.click(screen.getByRole("button", { name: /order history/i }));

    expect(screen.getByText(/no orders yet/i)).toBeInTheDocument();
    expect(screen.queryByText(/1 x live 12/i)).not.toBeInTheDocument();
  });
});
