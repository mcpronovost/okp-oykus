import { Suspense, lazy } from "react";
import { Card } from "antd";
import { useRouter } from "@/services/router";
import { OkpLoading } from "@/components/ui";
import { OkpLayout } from "@/components/layout";

function App({ data }) {
  const { route } = useRouter();

  if (route?.component) {
    const Component = lazy(route.component);
    return (
      <Suspense fallback={<OkpLoading />}>
        <Component data={data} />
      </Suspense>
    );
  }

  return (
    <OkpLayout>
      <div className="okp-grid">
        <Card>
          aaa
        </Card>
      </div>
    </OkpLayout>
  );
}

export default App;
