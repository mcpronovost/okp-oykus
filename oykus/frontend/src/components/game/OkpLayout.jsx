import "@/assets/styles/game/layout.scss";
import { OkpScrollarea } from "@/components/ui";
export default function OkpGameLayout({ children, data }) {
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
