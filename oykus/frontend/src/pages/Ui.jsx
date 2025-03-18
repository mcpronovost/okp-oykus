import "@/assets/styles/page/ui.scss";
import {
  OkpAvatar,
  OkpBanner,
  OkpButton,
  OkpEmpty,
  OkpLoading,
  OkpScrollarea,
} from "@/components/ui";
import { OkpHeading } from "@/components/common";

export default function OkpUi() {
  return (
    <OkpScrollarea id="okp-ui-scrollarea">
      <section className="okp-ui">
        <article>
          <OkpHeading title="Avatar" />
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <OkpAvatar />
            <OkpAvatar src="https://placehold.co/120x120" size={120} />
            <OkpAvatar fallback="OKP" size={80} />
            <OkpAvatar src="https://placehold.co/48x48" />
            <OkpAvatar src="https://placehold.co/48x48" stroke={4} />
          </div>
        </article>
        <article>
          <OkpHeading title="Banner" />
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <OkpBanner />
            <OkpBanner src="https://placehold.co/1024x120" alt="Banner" size={120} />
          </div>
        </article>
        <article
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <OkpHeading title="Button" />
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div>
              <OkpButton>Default</OkpButton>
            </div>
            <div>
              <OkpButton variant="outline">Outline</OkpButton>
            </div>
            <div>
              <OkpButton size="small">Default Small</OkpButton>
            </div>
            <div>
              <OkpButton variant="outline" size="small">Outline Small</OkpButton>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div>
              <OkpButton colour="primary">Default Primary</OkpButton>
            </div>
            <div>
              <OkpButton variant="outline" colour="primary">Outline Primary</OkpButton>
            </div>
            <div>
              <OkpButton colour="primary" size="small">Default Primary Small</OkpButton>
            </div>
            <div>
              <OkpButton variant="outline" colour="primary" size="small">Outline Primary Small</OkpButton>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div>
              <OkpButton colour="success">Default Success</OkpButton>
            </div>
            <div>
              <OkpButton variant="outline" colour="success">Outline Success</OkpButton>
            </div>
            <div>
              <OkpButton colour="success" size="small">Default Success Small</OkpButton>
            </div>
            <div>
              <OkpButton variant="outline" colour="success" size="small">Outline Success Small</OkpButton>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div>
              <OkpButton colour="warning">Default Warning</OkpButton>
            </div>
            <div>
              <OkpButton variant="outline" colour="warning">Outline Warning</OkpButton>
            </div>
            <div>
              <OkpButton colour="warning" size="small">Default Warning Small</OkpButton>
            </div>
            <div>
              <OkpButton variant="outline" colour="warning" size="small">Outline Warning Small</OkpButton>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div>
              <OkpButton colour="error">Default Error</OkpButton>
            </div>
            <div>
              <OkpButton variant="outline" colour="error">Outline Error</OkpButton>
            </div>
            <div>
              <OkpButton colour="error" size="small">Default Error Small</OkpButton>
            </div>
            <div>
              <OkpButton variant="outline" colour="error" size="small">Outline Error Small</OkpButton>
            </div>
          </div>
        </article>
        <article>
          <OkpHeading title="Empty" />
          <OkpEmpty />
        </article>
        <article>
          <OkpHeading title="Loading" />
          <div style={{ display: "flex", gap: "12px" }}>
            <OkpLoading variant="squares" />
            <OkpLoading variant="layers" />
            <OkpLoading variant="circles" />
          </div>
        </article>
      </section>
    </OkpScrollarea>
  );
}
