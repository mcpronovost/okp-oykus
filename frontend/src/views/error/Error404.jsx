import { useRouteError } from "react-router-dom";
import OkpCoreHeader from "@/components/core/Header";

export default function Error404View() {
  const error = useRouteError();

  console.log(error);

  return (
    <>
      <OkpCoreHeader />
      <div id="okp-core-body">
        <main id="okp-core-main">
          <div className="okp-fullview">
            <h1>Error {error.status}</h1>
            {error.status == 401 ? (
              <p>Oops! You're not authorized to access this page.</p>
            ) : (
              <p>Oops! This page doesn't exist.</p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
