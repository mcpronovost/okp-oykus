import { RouterProvider } from "@/services/router";
import { I18nProvider } from "@/services/i18n";

export default function OkpProviders({ children }) {
  return (
      <I18nProvider lang="fr">
    <RouterProvider>
        {children}
    </RouterProvider>
      </I18nProvider>
  );
}
