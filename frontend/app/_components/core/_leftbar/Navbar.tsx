"use client";

import { useContext } from "react";
import StoreContext from "@/app/_lib/store";
import ClientOnly from "@/app/_components/ClientOnly";

export default function Navbar({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { toggleSidebar } = useContext(StoreContext);

  return (
    <ClientOnly>
      <nav
        className={`okp-core-leftbar ${
          toggleSidebar ? "okp-open" : "okp-close"
        }`}
      >
        {children}
      </nav>
    </ClientOnly>
  );
}
