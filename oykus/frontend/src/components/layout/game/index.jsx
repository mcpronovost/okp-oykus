import "@/assets/styles/page/game/layout.scss";
import { Card } from "antd";
import { useTranslation } from "@/services/translation";
import { OkpLayout } from "@/components/layout";
import { OkpBanner, OkpLink } from "@/components/ui";

export default function OkpGameLayout({ children, data }) {
  const { t } = useTranslation();

  const gameCopyear = (() => {
    const createdYear = new Date(data.created_at).getFullYear();
    const updatedYear = new Date(data.updated_at).getFullYear();
    return createdYear === updatedYear ? createdYear : `${createdYear} - ${updatedYear}`;
  })();

  return (
    <OkpLayout data={data}>
      <section className="okp-game">
        <header className="okp-game-header">
          {/* TODO: Add custom game header or use default one */}
          <section className="okp-game-header-default">
            <Card cover={<OkpBanner src={data.cover} size="250" blur={0} />}>
              <h1 className="okp-game-header-default-title">{data.title}</h1>
            </Card>
          </section>
        </header>
        {children}
        <footer className="okp-game-footer">
          <section>
            <small>
              {data.title} &copy; {gameCopyear}{" "}
              {data.owner && (
                <OkpLink href={`/u/${data.owner.id}-${data.owner.slug}/`}>
                  {data.owner.name}
                </OkpLink>
              )}
              . {t("All rights reserved.")}
            </small>
            <small style={{ opacity: 0.8 }}>
              Oykus &copy; 2025 <OkpLink href="https://github.com/mcpronovost" target="_blank">mcpronovost</OkpLink>. {t("All rights reserved.")}
            </small>
          </section>
        </footer>
      </section>
    </OkpLayout>
  );
}
