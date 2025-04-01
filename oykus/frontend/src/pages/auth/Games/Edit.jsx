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
import OkpAuthGamesEditGeneral from "@/components/auth/games/forms/EditGeneral";

export default function OkpAuthGamesEdit({ data }) {
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
                  <OkpAuthGamesMenu />
                </Col>
                <Col span={24} md={16} xl={18}>
                  <OkpAuthGamesEditGeneral game={data.game} />
                </Col>
              </Row>
            </section>
          </>
        ) : (
          <OkpCard>
            <OkpEmpty text={t("No game found")} />
          </OkpCard>
        )}
      </div>
    </OkpLayout>
  );
}
