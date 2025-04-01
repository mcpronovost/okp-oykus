import "@/assets/styles/page/auth/gamesEdit.scss";
import { Col, Row } from "antd";
import { useTranslation } from "@/services/translation";
import { OkpLayout } from "@/components/layout";
import {
  OkpBreadcrumb,
  OkpCard,
  OkpEmpty,
  OkpHeading,
} from "@/components/ui";
import OkpAuthGamesMenu from "@/components/auth/games/Menu";

export default function OkpAuthGamesLayout({ data, children, activeItem = "edit" }) {
  const { t } = useTranslation();

  return (
    <OkpLayout data={data}>
      <div className="okp-grid">
        {data?.game ? (
          <>
            <OkpHeading title={data.game.title} tag="h1" />
            <OkpBreadcrumb items={[{ name: t("Your Games"), url: "a/games" }]} />
            <section className="okp-auth-games-edit">
              <Row gutter={[16, 16]}>
                <Col span={24} md={8} xl={6}>
                  <OkpAuthGamesMenu gameId={data.game.id} defaultActiveKey={1} activeItem={activeItem} />
                </Col>
                <Col span={24} md={16} xl={18}>
                  {children}
                </Col>
              </Row>
            </section>
          </>
        ) : (
          <>
            <OkpHeading title={t("Error")} tag="h1" />
            <OkpCard>
              <OkpEmpty text={t("No game found")} />
            </OkpCard>
          </>
        )}
      </div>
    </OkpLayout>
  );
}
