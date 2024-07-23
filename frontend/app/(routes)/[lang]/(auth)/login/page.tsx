import type { Metadata, ResolvingMetadata } from "next";
import type { okpLocale } from "@/app/_lib/i18n/types";
import { cache } from "react";
import { cookies } from "next/headers";
import { getTrans } from "@/app/_lib/i18n";
import LoginForm from "./LoginForm";

type Props = {
  params: { lang: okpLocale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTrans(params.lang);

  return {
    title: t.Login,
    description: t.Login,
  };
}

export default async function Page({ params }: Props) {
  const t = await getTrans(params.lang);

  return (
    <>
      <header className="okp-container">
        <h1>{t.Login}</h1>
        <LoginForm />
      </header>
    </>
  );
}
