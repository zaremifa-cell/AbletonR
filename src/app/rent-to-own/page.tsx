import type { Metadata } from "next";
import RentToOwnPage from "@/views/RentToOwnPage";

export const metadata: Metadata = {
  title: "Rent-to-Own",
  description: "Rent-to-own Live Suite page in the Ableton Programme shop flow.",
};

export default function Page() {
  return <RentToOwnPage />;
}
