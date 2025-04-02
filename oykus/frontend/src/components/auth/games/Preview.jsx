import "@/assets/styles/page/auth/gamesPreview.scss";
import { Skeleton, theme } from "antd";
import { OkpCard } from "@/components/ui";

const { useToken } = theme;

export default function OkpAuthGamesPreview({ data }) {
  const { token } = useToken();

  const theming = {
    primary: data.primary || token.colorPrimary,
    core_bg: data.core_bg || token.colorBgBase,
    core_fg: data.core_fg || token.colorTextBase,
    core_subtle_fg: data.core_subtle_fg || token.colorTextSecondary,
    core_header_bg: data.core_header_bg || token.Layout.headerBg,
    core_header_fg: data.core_header_fg || token.Layout.headerColor,
    core_elevated_fg: data.core_elevated_fg || token.colorText,
    card_bg: data.card_bg || token.colorBgContainer,
    card_placeholder_bg: data.card_placeholder_bg || token.colorFill,
    card_placeholder_fg: data.card_placeholder_fg || token.colorTextTertiary,
  }

  return (
    <figure className="okp-auth-games-preview" style={{ borderColor: token.colorBorder, borderRadius: token.borderRadius }}>
      <header className="okp-auth-games-preview-header" style={{ backgroundColor: theming.core_header_bg }}>
        <div className="okp-auth-games-preview-header-left">
          <Skeleton.Avatar style={{ backgroundColor: theming.core_header_fg, width: 32, height: 32 }} />
          <Skeleton.Node style={{ backgroundColor: theming.core_header_fg, width: 80, height: 14 }} />
        </div>
        <div className="okp-auth-games-preview-header-right">
          <Skeleton.Node style={{ backgroundColor: theming.core_header_fg, width: 14, height: 14 }} />
          <Skeleton.Node style={{ backgroundColor: theming.core_header_fg, width: 14, height: 14 }} />
          <Skeleton.Node style={{ backgroundColor: theming.core_header_fg, width: 14, height: 14 }} />
          <Skeleton.Node style={{ backgroundColor: theming.core_header_fg, width: 100, height: 14 }} />
          <Skeleton.Avatar style={{ backgroundColor: theming.core_header_fg, width: 32, height: 32 }} />
        </div>
      </header>
      <div className="okp-auth-games-preview-content" style={{ backgroundColor: theming.core_bg, color: theming.core_fg }}>
        <div className="okp-auth-games-preview-content-sideleft" style={{ backgroundColor: theming.card_bg }}>
          <div className="okp-auth-games-preview-content-sideleft-banner" style={{ backgroundColor: theming.card_placeholder_bg }}></div>
          <Skeleton.Avatar style={{ backgroundColor: theming.card_placeholder_bg, borderStyle: "solid", borderWidth: 4, borderColor: theming.card_bg, width: 48, height: 48, margin: "-24px 0 8px" }} />
          <Skeleton.Node style={{ backgroundColor: theming.core_fg, width: 34, height: 12 }} />
        </div>
        <div className="okp-auth-games-preview-content-main">
          <Skeleton.Node style={{ backgroundColor: theming.core_fg, width: 100, height: 16 }} />
          <Skeleton.Node style={{ backgroundColor: theming.core_subtle_fg, width: 120, height: 8 }} />
          <Skeleton.Node style={{ backgroundColor: theming.primary, width: 32, height: 2 }} />
          <OkpCard className="okp-auth-games-preview-content-main-card" style={{ backgroundColor: theming.card_bg, color: theming.core_fg }}>
            <div className="okp-auth-games-preview-content-main-card-banner" style={{ backgroundColor: theming.card_placeholder_bg }}></div>
            <Skeleton.Avatar style={{ backgroundColor: theming.card_placeholder_bg, borderStyle: "solid", borderWidth: 4, borderColor: theming.card_bg, width: 48, height: 48, margin: "-24px auto 0" }} />
            <div className="okp-auth-games-preview-content-main-card-text">
              <p>Praesent quis facilisis arcu, non congue ante. Praesent venenatis sagittis ligula, id tincidunt mauris euismod non. Suspendisse potenti. Quisque interdum est eros, a blandit augue vestibulum volutpat.</p>
            </div>
          </OkpCard>
          <OkpCard className="okp-auth-games-preview-content-main-card" style={{ backgroundColor: theming.card_bg, color: theming.core_fg }}>
            <div className="okp-auth-games-preview-content-main-card-banner" style={{ backgroundColor: theming.card_placeholder_bg }}></div>
            <Skeleton.Avatar style={{ backgroundColor: theming.card_placeholder_bg, borderStyle: "solid", borderWidth: 4, borderColor: theming.card_bg, width: 48, height: 48, margin: "-24px auto 0" }} />
            <div className="okp-auth-games-preview-content-main-card-text">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
              <p>Maecenas rutrum placerat enim vel pharetra. Etiam cursus nec nunc eget sodales. Quisque in placerat nisl, in vestibulum nulla. Integer nulla massa, auctor vel augue eget, elementum tristique ante.</p>
            </div>
          </OkpCard>
        </div>
        <div className="okp-auth-games-preview-content-sideright" style={{ backgroundColor: theming.card_bg }}>
          <Skeleton.Avatar style={{ backgroundColor: theming.card_placeholder_bg, width: 32, height: 32 }} />
          <Skeleton.Avatar style={{ backgroundColor: theming.card_placeholder_bg, width: 32, height: 32 }} />
          <Skeleton.Avatar style={{ backgroundColor: theming.card_placeholder_bg, width: 32, height: 32 }} />
        </div>
      </div>
    </figure>
  );
}
