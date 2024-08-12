import { StoreProvider } from "@/_lib/store";
import { ThemeProvider } from "@/_lib/theme";

export default function Providers({ children }) {
  return (
    <>
      <StoreProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </StoreProvider>
    </>
  );
}
