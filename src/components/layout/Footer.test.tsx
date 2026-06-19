import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Footer, { NewsletterSignup } from "./Footer";

describe("NewsletterSignup", () => {
  it("shows a subscribed state after a valid signup", async () => {
    const user = userEvent.setup();
    render(<NewsletterSignup />);

    await user.type(screen.getByLabelText(/email address/i), "artist@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(screen.getByRole("button", { name: /subscribed/i })).toBeInTheDocument();
  });
});

describe("Footer", () => {
  it("opens every footer link in a new tab", () => {
    render(<Footer />);

    screen.getAllByRole("link").forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noreferrer");
    });
  });
});
