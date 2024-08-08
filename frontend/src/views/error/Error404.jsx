import OkpCoreHeader from "@/components/core/Header";

export default function Error404View() {
  return (
    <>
      <OkpCoreHeader />
      <div id="okp-core-body">
        <main id="okp-core-main">
          <div className="okp-fullview">
            <h1>Error 404</h1>
            <p>Oops! This page doesn't exist.</p>
          </div>
        </main>
      </div>
    </>
  );
}
