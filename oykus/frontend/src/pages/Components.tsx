import { useState } from "react";
import { t } from "@mcpronovost/okp-i18n";
import { r } from "@mcpronovost/okp-router";
import { OkpAlert, OkpLoading } from "@/components/feedback";

export default function Components() {
  const [activeSection, setActiveSection] = useState<string>("alert");

  const handleCloseAlert = () => {
    console.log("close");
  };

  return (
    <section className="okp-grid">
      <header className="okp-header">
        <h1 className="okp-header-title">{t("Components")}</h1>
      </header>
      <p>Welcome to the components page</p>
      <a href={r("home")}>Go to Home</a>
      <article style={{ margin: "24px 0" }}>
        <h2>Feedback</h2>
        <nav style={{ margin: "12px 0 32px" }}>
          <button onClick={() => setActiveSection("alert")}>Alert</button>
          <button onClick={() => setActiveSection("loading")}>Loading</button>
        </nav>
        {activeSection === "alert" && (
          <section>
            <h3>Alert</h3>
            <div style={{ margin: "24px 0" }}>
              <OkpAlert />
            </div>
            <div style={{ margin: "24px 0" }}>
              <OkpAlert>This is a default alert</OkpAlert>
            </div>
            <div style={{ margin: "24px 0" }}>
              <OkpAlert
                title="This is my title"
                icon={false}
                closable
                onClose={handleCloseAlert}
              >
                This is a default closable alert without icon
              </OkpAlert>
            </div>
            <div style={{ margin: "24px 0" }}>
              <OkpAlert title="Profile updated" variant="success">
                Your profile has been updated successfully.
              </OkpAlert>
            </div>
            <div style={{ margin: "24px 0" }}>
              <OkpAlert
                title="An error occurred"
                message="Your profile could not be updated."
                variant="error"
              >
                Please, try again later.
              </OkpAlert>
            </div>
            <div style={{ margin: "24px 0" }}>
              <OkpAlert variant="warning" title="This is a warning alert" />
            </div>
            <div style={{ margin: "24px 0" }}>
              <OkpAlert variant="info">This is an info alert</OkpAlert>
            </div>
          </section>
        )}
        {activeSection === "loading" && (
          <section>
            <h3>Loading</h3>
            <OkpLoading />
          </section>
        )}
      </article>
    </section>
  );
}
