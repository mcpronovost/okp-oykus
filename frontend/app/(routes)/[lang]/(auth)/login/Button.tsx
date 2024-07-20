"use client"

import { setRat } from "@/app/_lib/api";

export default function Button() {
  const token = "4ffb6cfc6a955d585370e2096986f6345fcbfd49";

  function doLogin() {
    setRat(token);
  }

  return (
    <>
      <button onClick={doLogin}>Click here</button>
    </>
  );
}
