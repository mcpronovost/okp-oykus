"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { delAuth } from "@/app/_lib/api";

export default function Button() {
  const { push } = useRouter();

  function doLogout() {
    delAuth().then(() => {
      push("/");
    });
  }

  return (
    <>
      <button onClick={doLogout}>Click here</button>
    </>
  );
}
