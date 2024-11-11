import type { User } from "@/_libs/types/auth.types";
import type { Game, Character } from "@/_libs/types/games.types";
import { useContext, useEffect, useState } from "react";
import WebContext from "@/_libs/store/storeWeb";
import OkpCore from "@/components/core/Core";

interface Props {
  user?: User;
  core?: {
    user?: User;
    characters?: Character[];
    games?: Game[];
  };
}

export default function OkpHomeView ({ user, core }: Props) {
  const { lang } = useContext(WebContext);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    console.log("Home component mounted, lang:", lang);
  }, []);

  // Add debug logging for lang changes
  useEffect(() => {
    if (mounted) {
      console.log("Home component lang updated:", lang);
    }
  }, [lang, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <OkpCore user={user} core={core}>
      <h1>Hello World! - {lang}</h1>
    </OkpCore>
  );
}