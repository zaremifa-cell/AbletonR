import type { Metadata } from "next";
import Live12Page from "@/views/Live12Page";

export const metadata: Metadata = {
  title: "Live 12",
  description:
    "Live 12 product page for the Ableton Programme portfolio redesign.",
};

export default function Page() {
  return <Live12Page />;
}
