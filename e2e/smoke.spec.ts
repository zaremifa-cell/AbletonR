import { expect, test } from "@playwright/test";

test("home page exposes the product archive", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /four instruments/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /live/i }).first()).toBeVisible();
});

test("shop flow can add an item to the cart", async ({ page }) => {
  await page.goto("/shop");

  await page.getByRole("button", { name: /add to cart/i }).first().click();
  await page.getByRole("link", { name: /view cart/i }).first().click();

  await expect(page.getByRole("heading", { name: /cart/i })).toBeVisible();
  await expect(page.getByText(/live 12/i)).toBeVisible();
});
