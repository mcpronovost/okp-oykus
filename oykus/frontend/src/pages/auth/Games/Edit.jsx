import "@/assets/styles/page/auth/gamesEdit.scss";
import { Col, Row } from "antd";
import { useTranslation } from "@/services/translation";
import { OkpLayout } from "@/components/layout";
import {
  OkpCard,
  OkpEmpty,
  OkpHeading,
} from "@/components/ui";
import OkpAuthGamesMenu from "@/components/auth/games/Menu";
import OkpAuthGamesEditGeneral from "@/components/auth/games/forms/EditGeneral";

export default function OkpAuthGamesEdit({ data }) {
  const { t } = useTranslation();
  console.log(data);

  return (
    <OkpLayout data={data}>
      <div className="okp-grid">
        {data?.game ? (
          <>
            <OkpHeading title={data.game.title} tag="h1" />
            <Row gutter={[16, 16]}>
              <Col span={24} md={6}>
                <OkpAuthGamesMenu />
              </Col>
              <Col span={24} md={18}>
                <OkpAuthGamesEditGeneral game={data.game} />
              </Col>
            </Row>
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
