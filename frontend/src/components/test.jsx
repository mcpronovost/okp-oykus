import { Construction, CircleCheckBig, OctagonX, TriangleAlert } from "lucide-react";
import OkpButton from "@/components/common/Button";

export default function Test() {
  return (
    <div className="okp-container">
      <OkpButton>Default</OkpButton>
      <br />
      <OkpButton colour="primary">Primary</OkpButton>
      <br />
      <OkpButton colour="secondary">Secondary</OkpButton>
      <br />
      <OkpButton colour="success" start={<CircleCheckBig />}>Success</OkpButton>
      <br />
      <OkpButton colour="warning" start={<TriangleAlert />}>Warning</OkpButton>
      <br />
      <OkpButton colour="danger" start={<OctagonX />}>Error</OkpButton>
      <br />
      <OkpButton disabled>Disabled</OkpButton>
      <br />
      <OkpButton loading>Loading</OkpButton>
      <br />
      <OkpButton start={<Construction />}>With Start</OkpButton>
      <br />
      <OkpButton end={<Construction />}>With End</OkpButton>
      <br />
      <OkpButton start={<Construction />} end={<Construction />}>With Start and End</OkpButton>
    </div>
  );
}
