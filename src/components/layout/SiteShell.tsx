"use client";

import { useState, type ReactNode } from "react";
import type { PackSummary } from "@/data/packs";
import { CartProvider } from "@/contexts/CartContext";
import { PackPreviewProvider } from "@/contexts/PackPreviewContext";
import Nav from "@/components/layout/Nav";

function SiteShell({ children }: { children: ReactNode }) {
  const [activePack, setActivePack] = useState<PackSummary | null>(null);

  return (
    <CartProvider>
      <PackPreviewProvider activePack={activePack} setActivePack={setActivePack}>
        <Nav activePack={activePack} />
        {children}
      </PackPreviewProvider>
    </CartProvider>
  );
}

export default SiteShell;
