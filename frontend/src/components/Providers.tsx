import { AppProvider } from "@/_libs/stores/AppContext";
import { AuthProvider } from "@/_libs/stores/AuthContext";
import { I18nProvider } from "@/_libs/stores/I18nContext";
import { RouterProvider } from "@/_libs/stores/RouterContext";

export default function Providers ({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <AuthProvider>
        <I18nProvider>
          <RouterProvider>
            {children}
          </RouterProvider>
        </I18nProvider>
      </AuthProvider>
    </AppProvider>
  );
}
