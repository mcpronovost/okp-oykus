import "@/assets/styles/page/ui.scss";
import { User, Search } from "lucide-react";
import {
  OkpAvatar,
  OkpBanner,
  OkpButton,
  OkpCard,
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
          <OkpHeading title="Typography" />
          <div style={{ color: "var(--okp-fg)" }}>
            <p>This is a paragraph "FG".</p>
          </div>
          <div style={{ color: "var(--okp-fg-subtle)" }}>
            <p>This is a paragraph "FG Subtle".</p>
          </div>
          <OkpCard>
            <p style={{ color: "var(--okp-card-fg)" }}>This is a paragraph "Card" with "Card FG".</p>
            <p style={{ color: "var(--okp-card-fg-subtle)" }}>This is a paragraph "Card" with "Card FG Subtle".</p>
          </OkpCard>
        </article>
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
            <OkpButton prepend={<User />}>Default</OkpButton>
            <OkpButton append={<Search />} variant="outline">Outline</OkpButton>
            <OkpButton variant="soft">Soft</OkpButton>
          </div>
          <div className="okp-ui-group">
            <OkpButton size="small">Default Small</OkpButton>
            <OkpButton variant="outline" size="small">Outline Small</OkpButton>
            <OkpButton variant="soft" size="small">Soft Small</OkpButton>
          </div>
          <div className="okp-ui-group">
            <OkpButton colour="primary">Default Primary</OkpButton>
            <OkpButton variant="outline" colour="primary">Outline Primary</OkpButton>
            <OkpButton variant="soft" colour="primary">Soft Primary</OkpButton>
          </div>
          <div className="okp-ui-group">
            <OkpButton colour="primary" size="small" append={<Search />}>Default Primary Small</OkpButton>
            <OkpButton variant="outline" colour="primary" size="small">Outline Primary Small</OkpButton>
            <OkpButton variant="soft" colour="primary" size="small">Soft Primary Small</OkpButton>
          </div>
          <div className="okp-ui-group">
            <OkpButton colour="secondary">Default Secondary</OkpButton>
            <OkpButton variant="outline" colour="secondary">Outline Secondary</OkpButton>
            <OkpButton variant="soft" colour="secondary">Soft Secondary</OkpButton>
          </div>
          <div className="okp-ui-group">
            <OkpButton colour="secondary" size="small">Default Secondary Small</OkpButton>
            <OkpButton variant="outline" colour="secondary" size="small">Outline Secondary Small</OkpButton>
            <OkpButton variant="soft" colour="secondary" size="small">Soft Secondary Small</OkpButton>
          </div>
          <div className="okp-ui-group">
            <OkpButton colour="success">Default Success</OkpButton>
            <OkpButton variant="outline" colour="success">Outline Success</OkpButton>
            <OkpButton variant="soft" colour="success">Soft Success</OkpButton>
          </div>
          <div className="okp-ui-group">
            <OkpButton colour="success" size="small">Default Success Small</OkpButton>
            <OkpButton variant="outline" colour="success" size="small">Outline Success Small</OkpButton>
            <OkpButton variant="soft" colour="success" size="small">Soft Success Small</OkpButton>
          </div>
          <div className="okp-ui-group">
            <OkpButton colour="error">Default Error</OkpButton>
            <OkpButton variant="outline" colour="error">Outline Error</OkpButton>
            <OkpButton variant="soft" colour="error">Soft Error</OkpButton>
          </div>
          <div className="okp-ui-group">
            <OkpButton colour="error" size="small">Default Error Small</OkpButton>
            <OkpButton variant="outline" colour="error" size="small">Outline Error Small</OkpButton>
            <OkpButton variant="soft" colour="error" size="small">Soft Error Small</OkpButton>
          </div>
          <div className="okp-ui-group">
            <OkpButton block>Default Block</OkpButton>
            <OkpButton variant="outline" block>Outline Block</OkpButton>
            <OkpButton variant="soft" block>Soft Block</OkpButton>
          </div>
          <div className="okp-ui-group">
            <OkpButton variant="outline" block dashed>Outline Block Dashed</OkpButton>
            <OkpButton variant="soft" block dashed>Soft Block Dashed</OkpButton>
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
