import { Construction } from "lucide-react";
import OkpButton from "@/components/common/Button";

export default function Test() {
  return (
    <div>
      <Construction />
      <br /><br />
      <OkpButton>Default</OkpButton>
      <br />
      <OkpButton colour="primary">Primary</OkpButton>
      <br />
      <OkpButton colour="secondary">Secondary</OkpButton>
      <br />
      <OkpButton colour="success">Success</OkpButton>
      <br />
      <OkpButton colour="warning">Warning</OkpButton>
      <br />
      <OkpButton colour="danger">Error</OkpButton>
      <br />
      <OkpButton disabled>Disabled</OkpButton>
      <br />
      <OkpButton start={<Construction />}>With Start</OkpButton>
      <br />
      <OkpButton end={<Construction />}>With End</OkpButton>
      <br />
      <OkpButton start={<Construction />} end={<Construction />}>With Start and End</OkpButton>
    </div>
  );
}
