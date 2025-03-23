import { Card } from "antd";
import { OkpLayout } from "@/components/layout";

export default function Error404() {
  return (
    <OkpLayout>
      <div className="okp-grid">
        <Card>
          404
        </Card>
      </div>
    </OkpLayout>
  );
}