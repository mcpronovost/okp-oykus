import type { Metadata } from "next";
import type { okpLocale } from "@/app/_lib/i18n/types";
import { cache } from "react";
import { getTrans } from "@/app/_lib/i18n";

type Props = {
  params: { lang: okpLocale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTrans(params.lang);

  return {
    title: t.Contact,
    description: t.Contact,
  };
}

export default async function Page({ params }: Props) {
  const t = await getTrans(params.lang);

  return (
    <>
      <header className="okp-container">
        <h1>{t.Contact}</h1>
      </header>
    </>
  );
}
