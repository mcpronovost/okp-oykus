"use client";

import { StoreProvider } from "@/app/_lib/store";

export default function Providers({ children }) {
  return (
    <StoreProvider>
      {children}
    </StoreProvider>
  );
}
