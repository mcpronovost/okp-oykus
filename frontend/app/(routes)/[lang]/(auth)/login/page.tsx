import type { Metadata } from "next";
import { cache } from "react";
import { getTrans } from "@/app/_lib/i18n";
 
type Props = {
  params: { game: string };
}

const getData = cache(async (game: string) => {
  return null;
});

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const t = await getTrans(params.lang);

  return {
    title: t.Login,
    description: t.Login,
  };
};

export default async function Page({params}: Props) {
  const t = await getTrans(params.lang);

  return (
    <>
    <header className="okp-container">
      <h1>{t.Login}</h1>
    </header>
    </>
  );
};
