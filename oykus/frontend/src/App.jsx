import { Suspense, lazy } from "react";
import { useRouter } from "@/services/router";
import Loading from "@/components/ui/Loading";

function App() {
  const { route } = useRouter();

  if (route?.component) {
    const Component = lazy(route.component);
    return (
      <Suspense fallback={<Loading />}>
        <Component />
      </Suspense>
    );
  }

  return <Loading />;
}

export default App;
