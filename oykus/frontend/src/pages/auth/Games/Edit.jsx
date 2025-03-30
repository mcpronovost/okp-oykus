import "@/assets/styles/page/auth/gamesEdit.scss";
import { Col, Row } from "antd";
import { MessagesSquare, Orbit, Paintbrush } from "lucide-react";
import { useTranslation } from "@/services/translation";
import { OkpLayout } from "@/components/layout";
import {
  OkpCard,
  OkpCollapse,
  OkpCollapseLabel,
  OkpCollapseMenu,
  OkpEmpty,
  OkpHeading,
} from "@/components/ui";

const items = [
  {
    key: "1",
    label: (
      <OkpCollapseLabel
        title="Game Information"
        description="Title, description, cover, visibility, and more"
        icon={Orbit}
      />
    ),
    children: (
      <OkpCollapseMenu
        items={[
          {
            label: "General",
            href: "#",
          },
        ]}
      />
    ),
  },
  {
    key: "2",
    label: (
      <OkpCollapseLabel
        title="Forum"
        description="Categories, sections, permissions, and settings"
        icon={MessagesSquare}
      />
    ),
    children: (
      <OkpCollapseMenu
        items={[
          {
            label: "General",
            href: "#",
          },
          {
            label: "Index",
            href: "#",
          },
        ]}
      />
    ),
  },
  {
    key: "3",
    label: (
      <OkpCollapseLabel
        title="Style"
        description="Colours and custom stylesheet"
        icon={Paintbrush}
      />
    ),
    children: (
      <OkpCollapseMenu
        items={[
          {
            label: "General",
            href: "#",
          },
          {
            label: "Stylesheet",
            href: "#",
          },
        ]}
      />
    ),
  },
];

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
                <OkpCard>
                  <OkpCollapse items={items} defaultActiveKey={["1"]} />
                </OkpCard>
              </Col>
              <Col span={24} md={18}>
                <Row gutter={[16, 16]}>
                  <Col span={24} sm={17}>
                    <section className="okp-auth-games-edit-banner">
                      <OkpCard
                        cover={
                          <img
                            src={data.game.cover}
                            alt={data.game.title}
                            className="okp-auth-games-edit-banner-cover"
                          />
                        }
                      >
                        <div className="okp-auth-games-edit-banner-title">
                          {data.game.title}
                        </div>
                        <div className="okp-auth-games-edit-banner-subtitle">
                          {data.game.subtitle}
                        </div>
                      </OkpCard>
                    </section>
                  </Col>
                  <Col span={24} sm={7}>
                    <section className="okp-auth-games-edit-banner">
                      <OkpCard style={{ height: "100%" }}>Edit Cover</OkpCard>
                    </section>
                  </Col>
                  <Col span={24}>
                    <section className="okp-auth-games-edit-general">
                      <OkpCard>General</OkpCard>
                    </section>
                  </Col>
                </Row>
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
