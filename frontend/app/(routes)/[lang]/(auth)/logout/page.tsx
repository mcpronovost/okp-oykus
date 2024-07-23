import type { Metadata, ResolvingMetadata } from "next";
import type { okpLocale } from "@/app/_lib/i18n/types";
import { cache } from "react";
import { getTrans } from "@/app/_lib/i18n";
import Button from "./Button";

type Props = {
  params: { lang: okpLocale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTrans(params.lang);

  return {
    title: t.Logout,
    description: t.Logout,
  };
}

export default async function Page({ params }: Props) {
  const t = await getTrans(params.lang);

  return (
    <>
      <header className="okp-container">
        <h1>{t.Logout}</h1>
        <Button />
      </header>
    </>
  );
}
