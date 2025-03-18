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
          <div className="okp-ui-group">
            <div>
              <OkpButton>Default</OkpButton>
            </div>
            <div>
              <OkpButton variant="outline">Outline</OkpButton>
            </div>
          </div>
          <div className="okp-ui-group">
            <div>
              <OkpButton colour="primary">Default Primary</OkpButton>
            </div>
            <div>
              <OkpButton variant="outline" colour="primary">Outline Primary</OkpButton>
            </div>
          </div>
          <div className="okp-ui-group">
            <div>
              <OkpButton colour="success">Default Success</OkpButton>
            </div>
            <div>
              <OkpButton variant="outline" colour="success">Outline Success</OkpButton>
            </div>
          </div>
          <div className="okp-ui-group">
            <div>
              <OkpButton colour="error">Default Error</OkpButton>
            </div>
            <div>
              <OkpButton variant="outline" colour="error">Outline Error</OkpButton>
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
