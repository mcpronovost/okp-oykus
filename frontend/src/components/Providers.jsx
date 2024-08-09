import { StoreProvider } from "@/_lib/store";

export default function Providers ({ children }) {
  return (
    <>
      <StoreProvider>{children}</StoreProvider>
    </>
  );
};
