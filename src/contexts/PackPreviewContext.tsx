"use client";

import { createContext, useContext, type Dispatch, type ReactNode, type SetStateAction } from "react";
import type { PackSummary } from "@/data/packs";

type PackPreviewContextValue = {
  activePack: PackSummary | null;
  setActivePack: Dispatch<SetStateAction<PackSummary | null>>;
};

const PackPreviewContext = createContext<PackPreviewContextValue | null>(null);

export function PackPreviewProvider({
  activePack,
  setActivePack,
  children,
}: PackPreviewContextValue & { children: ReactNode }) {
  return (
    <PackPreviewContext.Provider value={{ activePack, setActivePack }}>
      {children}
    </PackPreviewContext.Provider>
  );
}

export function usePackPreview() {
  const context = useContext(PackPreviewContext);
  if (!context) {
    throw new Error("usePackPreview must be used inside PackPreviewProvider");
  }
  return context;
}
