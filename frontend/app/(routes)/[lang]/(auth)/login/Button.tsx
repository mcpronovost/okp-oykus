"use client"

import { setRat, setAgent } from "@/app/_lib/api";

export default function Button() {

  function doLogin() {
    const token = "154227ea81a3a2ba1563aefc0ec301995f675c36";
    const agent = navigator.userAgent;
    setRat(token);
    setAgent(agent);
  }

  return (
    <>
      <button onClick={doLogin}>Click here</button>
    </>
  );
}
