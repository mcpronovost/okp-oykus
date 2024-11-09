import type { Character } from "@/types/game.types";
import React, { useContext, useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { getTranslation } from "@/i18n/i18n";
import GameContext from "src/stores/storeGame";
import OkpLoading from "@/components/ui/Loading";
import OkpHeader from "@/components/common/Header";

export default function Character ({ cpk }: { cpk: string }) {
  const { lang } = useContext(GameContext);
  const t = getTranslation(lang);
  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState<Character | null>(null);

  async function getCharacter () {
    setIsLoading(true);
    try {
      const query = await fetch(`/api/games/characters/${cpk}/`);
      if (!query.ok) throw new Error("Failed to fetch data");
  
      const response = await query.json();
      if (!response) throw new Error("Character not found");

      setCharacter(response);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCharacter();
  }, []);

  if (isLoading) return <OkpLoading />;

  return (
    <div className="okp-grid">
      <section className="okp-characters">
        {(character && character.id) ? (
          <div>
            <OkpHeader title={character.name} />
          </div>
        ) : (
          <div className="okp-forum-notfound">
            <div className="okp-forum-notfound-wrapper">
              <AlertCircle className="icon" />
              <h2>{t("No Character Found")}</h2>
              <p>{t("It seems there are no character available at the moment.")}</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}