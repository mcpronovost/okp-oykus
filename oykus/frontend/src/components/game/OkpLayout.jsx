import "@/assets/styles/game/layout.scss";
// import { OkpError } from "@/components/common";
import { OkpScrollarea } from "@/components/ui";

export default function OkpGameLayout({ children, data }) {
  if (!data) return window.location.reload(true);

  return (
    <OkpScrollarea>
      <section className="okp-game">
        <header className="okp-game-header">
          <h1 className="okp-game-header-title">
          <a href={`/g/${data.slug}/`}>{data.title}</a>
        </h1>
        </header>
        {children}
      </section>
    </OkpScrollarea>
  );
}
