import { r } from "@mcpronovost/okp-router";

export default function Devblog() {
  return (
    <div>
      <h1>Devblog</h1>
      <p>Welcome to the devblog page</p>
      <a href={r("home")}>Go to Home</a>
    </div>
  );
}
