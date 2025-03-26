import { Card } from "antd";
import { OkpLayout } from "@/components/layout";

export default function Home({ data }) {
  return (
    <OkpLayout data={data}>
      <div className="okp-grid">
        <Card>
          aaa
        </Card>
      </div>
    </OkpLayout>
  );
}
