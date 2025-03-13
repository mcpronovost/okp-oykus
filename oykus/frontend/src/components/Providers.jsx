import { Theme } from "@radix-ui/themes";
import RouterProvider from "@/services/router";

export default function OkpProviders({ children }) {
  return (
    <Theme
      hasBackground={false}
      appearance="dark"
      accentColor="blue"
      grayColor="sage"
    >
      <RouterProvider>
        {children}
      </RouterProvider>
    </Theme>
  );
}
