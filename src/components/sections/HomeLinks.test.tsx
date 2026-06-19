import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Artists from "./Artists";
import Features from "./Features";

describe("home external links", () => {
  it("opens Discover More cards in a new tab", () => {
    render(<Features />);

    ["Downloads", "Max for Live", "Tutorials", "Community"].forEach((name) => {
      const link = screen.getByRole("link", { name: new RegExp(name, "i") });

      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noreferrer");
    });
  });

  it("opens artist story links in a new tab", () => {
    render(<Artists />);

    screen.getAllByRole("link").forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noreferrer");
    });
  });
});
