import "@/assets/styles/common/error.scss";
import { OkpHeading } from "@/components/common";

export default function OkpError() {
  return (
    <section className="okp-error">
      <OkpHeading title="Error" description="An error occurred while loading the page." tag="h1" />
    </section>
  );
}
