"use client"

import { delAuth } from "@/app/_lib/api";

export default function Button() {

  function doLogout() {
    delAuth();
  }

  return (
    <>
      <button onClick={doLogout}>Click here</button>
    </>
  );
}
