import { Suspense, lazy } from "react";
import { getRoute, useRouter } from "@/services/router";
import { OkpLoading } from "@/components/ui";
import OkpErrorBoundary from "@/components/ErrorBoundary";

function App({ lang, path, data }) {
  return <AppContent lang={lang} path={path} data={data} />
}

function AppContent({ lang, path, data }) {
  const route = getRoute(path, lang)[1]

  if (route?.component) {
    const Component = lazy(route.component);
    return (
      <OkpErrorBoundary>
        <Suspense fallback={<OkpLoading />}>
          <Component data={data} />
        </Suspense>
      </OkpErrorBoundary>
    );
  }

  return (
    <OkpLoading />
  );
}

export default App;
