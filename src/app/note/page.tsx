import type { Metadata } from "next";
import NotePage from "@/views/NotePage";

export const metadata: Metadata = {
  title: "Note",
  description: "Note product page for the Ableton Programme portfolio redesign.",
};

export default function Page() {
  return <NotePage />;
}
