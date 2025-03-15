import RouterProvider from "@/services/router/context";
import I18nProvider from "@/services/i18n/context";

export default function OkpProviders({ children }) {
  return (
    <RouterProvider>
      <I18nProvider>
        {children}
      </I18nProvider>
    </RouterProvider>
  );
}
