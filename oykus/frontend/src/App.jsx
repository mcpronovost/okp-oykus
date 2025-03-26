import { Suspense, lazy } from "react";
import { getRoute } from "@/services/router";
import { OkpLoading } from "@/components/ui";
import OkpErrorBoundary from "@/components/ErrorBoundary";

// Move Component creation outside of render to prevent recreation on hot-reload
function getComponent(componentImport) {
  try {
    return lazy(componentImport);
  } catch (error) {
    console.error("Error loading component: ", error);
    return <OkpLoading />;
  }
}

function App({ lang, path, data }) {
  return <AppContent lang={lang} path={path} data={data} />
}

function AppContent({ lang, path, data }) {
  const route = getRoute(path, lang)[1];

  if (route?.component) {
    const Component = getComponent(route.component);
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