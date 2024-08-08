import { useState } from "react";
import { StoreProvider } from "@/_lib/store";

const Providers = ({ children }) => {
  return (
    <>
      <StoreProvider>{children}</StoreProvider>
    </>
  );
};

export default Providers;
