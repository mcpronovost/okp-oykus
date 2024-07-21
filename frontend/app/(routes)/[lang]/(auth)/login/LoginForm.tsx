"use client";

import { Suspense, useEffect, useState } from "react";
import { setAgent } from "@/app/_lib/api";
import { getAgent, getAgent64, getCookie } from "@/app/_lib/client";
import { doLogin } from "./actions";

export default function LoginForm() {
  const currentAgent = getAgent64();
  const cookieAgent = getCookie("okp-arat");

  useEffect(() => {
    if (currentAgent != cookieAgent) {
      setAgent(getAgent());
    }
  }, [cookieAgent]);

  return (
    <>
      <form action={doLogin}>
        <input type="text" name="username" />
        <input type="password" name="mdp" />
        <button>Click here</button>
      </form>
    </>
  );
}
