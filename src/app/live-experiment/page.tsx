import type { Metadata } from "next";
import LiveExperimentPage from "@/views/LiveExperimentPage";

export const metadata: Metadata = {
  title: "Live Experiment",
  description: "Experimental Live page concept in the Ableton Programme portfolio.",
};

export default function Page() {
  return <LiveExperimentPage />;
}
