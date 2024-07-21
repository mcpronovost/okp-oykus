"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api, setRat } from "@/app/_lib/api";

export const doLogin = async (formData: FormData) => {
  const cookieStore = cookies();
  let isAuth = null;

  const okpForm = {
    username: formData.get("username"),
    mdp: formData.get("mdp"),
    agent: cookieStore.get("okp-arat")?.value,
  };

  try {
    const res = await fetch(await api("/auth/login/"), {
      method: "POST",
      headers: {
        "Accept": "application/json;charset=UTF-8",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(okpForm),
    });
    if (!res.ok) {
      console.error("Fetch failed.");
    }
    const result = await res.json();
    isAuth = result.rat;
  } catch (e) {
    console.error(e);
  } finally {
    if (isAuth) {
      await setRat(isAuth);
      redirect("/");
    }
  }
};
