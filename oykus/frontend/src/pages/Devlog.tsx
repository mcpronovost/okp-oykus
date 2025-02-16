import { r } from "@mcpronovost/okp-router";
import { OkpAlert } from "@/components/feedback";

export default function Devlog() {

  const handleCloseAlert = () => {
    console.log("close");
  };

  return (
    <div>
      <h1>Devlog</h1>
      <p>Welcome to the devlog page</p>
      <a href={r("home")}>Go to Home</a>
      <div style={{ margin: "24px" }}>
        <OkpAlert />
      </div>
      <div style={{ margin: "24px" }}>
        <OkpAlert>This is a default alert</OkpAlert>
      </div>
      <div style={{ margin: "24px" }}>
        <OkpAlert title="This is my title" icon={false} closable onClose={handleCloseAlert}>
          This is a default closable alert without icon
        </OkpAlert>
      </div>
      <div style={{ margin: "24px" }}>
        <OkpAlert title="Profile updated" variant="success">Your profile has been updated successfully.</OkpAlert>
      </div>
      <div style={{ margin: "24px" }}>
        <OkpAlert title="An error occurred" message="Your profile could not be updated." variant="error">Please, try again later.</OkpAlert>
      </div>
      <div style={{ margin: "24px" }}>
        <OkpAlert variant="warning" title="This is a warning alert" />
      </div>
      <div style={{ margin: "24px" }}>
        <OkpAlert variant="info">This is an info alert</OkpAlert>
      </div>
    </div>
  );
}
