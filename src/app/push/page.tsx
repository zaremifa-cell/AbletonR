import type { Metadata } from "next";
import Push3Page from "@/views/Push3Page";

export const metadata: Metadata = {
  title: "Push",
  description: "Push product page for the Ableton Programme portfolio redesign.",
};

export default function Page() {
  return <Push3Page />;
}
