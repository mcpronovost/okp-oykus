import type { Metadata, ResolvingMetadata } from "next";
import type { okpLocale } from "@/app/_lib/i18n/types";
import type { GameForumIndex } from "./types";
import { cache } from "react";
import { headers } from "next/headers";

type Props = {
  params: { lang: okpLocale; game: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const getData = cache(async (game: string) => {
  const protocol = headers().get("x-forwarded-proto");
  try {
    const res = await fetch(
      `${protocol}://backend:8000/api/forum/${game}/index/`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch {
    throw new Error("Failed to fetch data");
  }
});

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const data: GameForumIndex = await getData(params.game);
  return {
    title: data.game.name,
    description: "Index du forum.",
  };
}

export default async function Page({ params }: Props) {
  const data: GameForumIndex = await getData(params.game);

  return (
    <>
      <div>
        <div>
          <h1>{data.game.name}</h1>
        </div>
        <div>
          {data.categories.map((category) => {
            return (
              <div key={`category-${category.id}`}>
                <h2>{category.name}</h2>
                <p>{category.description}</p>
                <div>
                  {category.sections.map((section) => {
                    return (
                      <div key={`section-${section.id}`}>
                        <h3>{section.name}</h3>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
