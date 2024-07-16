import type { Metadata } from "next";
import { headers } from "next/headers";

async function getData(game: string) {
  const protocol = headers().get("x-forwarded-proto");
  try {
    const res = await fetch(`${protocol}://backend:8000/api/forum/${game}/index/`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json()
  } catch {
    throw new Error("Failed to fetch data");
  }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const data = await getData(params.game);
  return {
    title: data.game.name,
    description: "Index du forum.",
  };
};

export default async function Page({params}: {params: {game: string}}) {
  const data = await getData(params.game);

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
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
}
