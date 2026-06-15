import type { Metadata } from "next";
import MovePage from "@/views/MovePage";

export const metadata: Metadata = {
  title: "Move",
  description: "Move product page for the Ableton Programme portfolio redesign.",
};

export default function Page() {
  return <MovePage />;
}
