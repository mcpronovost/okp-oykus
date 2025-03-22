import { Suspense, lazy } from "react";
import { useRouter } from "@/services/router";
import OkpErrorBoundary from "@/components/ErrorBoundary";
import Loading from "@/components/ui/Loading";

function App({ data }) {
  const { route } = useRouter();

  if (route?.component) {
    const Component = lazy(route.component);
    return (
      <OkpErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Component data={data} />
        </Suspense>
      </OkpErrorBoundary>
    );
  }

  return <Loading />;
}

export default App;
