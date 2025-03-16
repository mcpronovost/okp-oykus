import "@/assets/styles/game/layout.scss";

export default function OkpGameLayout({ children, data }) {
  return (
    <section className="okp-game">
      <header className="okp-game-header">
        <h1 className="okp-game-header-title">
          <a href={`/g/${data.slug}/`}>{data.title}</a>
        </h1>
      </header>
      {children}
    </section>
  );
}
