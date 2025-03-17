import { useRef, Suspense, lazy } from "react";
import { useRouter } from "@/services/router";
import { getInitData } from "@/utils";
import OkpErrorBoundary from "@/components/ErrorBoundary";
import Loading from "@/components/ui/Loading";

function App() {
  const initDataRef = useRef(getInitData());
  const { route } = useRouter();

  if (route?.component) {
    const Component = lazy(route.component);
    return (
      <OkpErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Component data={initDataRef.current} />
        </Suspense>
      </OkpErrorBoundary>
    );
  }

  return <Loading />;
}

export default App;
