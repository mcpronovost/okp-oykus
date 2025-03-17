import "@/assets/styles/game/layout.scss";
import { useI18n } from "@/services/i18n";
import { OkpLink, OkpScrollarea } from "@/components/ui";

export default function OkpGameLayout({ children, data }) {
  if (!data) return window.location.reload(true);

  const { t } = useI18n();

  const gameCopyear = (() => {
    const createdYear = new Date(data.created_at).getFullYear();
    const updatedYear = new Date(data.updated_at).getFullYear();
    return createdYear === updatedYear ? createdYear : `${createdYear} - ${updatedYear}`;
  })();

  return (
    <OkpScrollarea id="okp-scrollarea">
      <section className="okp-game">
        {/* Game Header */}
        <header className="okp-game-header">
          <h1 className="okp-game-header-title">
            <OkpLink href={`/g/${data.slug}/`}>{data.title}</OkpLink>
          </h1>
        </header>

        {/* Game Content */}
        {children}

        {/* Game Footer */}
        <footer className="okp-game-footer">
          <section>
            <small>
              {data.title} &copy; {gameCopyear} {data.owner && (
                <OkpLink href={`/u/${data.owner.id}-${data.owner.slug}/`}>{data.owner.name}</OkpLink>
              )}. {t("All rights reserved.")}
            </small>
          </section>
        </footer>
      </section>
    </OkpScrollarea>
  );
}
