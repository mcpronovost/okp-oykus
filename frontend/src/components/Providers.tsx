import { RouterProvider } from "@/_lib/router";
import { StoreProvider } from "@/_lib/store";

const Providers = ({ children }) => {
  return (
    <>
      <RouterProvider>
        <StoreProvider>{children}</StoreProvider>
      </RouterProvider>
    </>
  );
};

export default Providers;
