"use client"

import { delRat } from "@/app/_lib/api";

export default function Button() {

  function doLogout() {
    delRat();
  }

  return (
    <>
      <button onClick={doLogout}>Click here</button>
    </>
  );
}
