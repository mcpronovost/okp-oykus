import type { Lang } from "@/types/i18n.types";
import { createContext, useState } from "react";
import { defaultLang, locales } from "@/i18n/i18n";

const FORUM_TOPICS_PER_PAGE = 32;
const FORUM_MESSAGES_PER_PAGE = 32;

interface GameContextType {
  lang: Lang;
  setStoreLang: (value: Lang) => void;
  topicsPerPage: number;
  setStoreTopicsPerPage: (value: number) => void;
  messagesPerPage: number;
  setStoreMessagesPerPage: (value: number) => void;
}

const GameContext = createContext<GameContextType>({
  lang: defaultLang,
  setStoreLang: () => {},
  topicsPerPage: FORUM_TOPICS_PER_PAGE,
  setStoreTopicsPerPage: () => {},
  messagesPerPage: FORUM_MESSAGES_PER_PAGE,
  setStoreMessagesPerPage: () => {},
});

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const setToStore = (key: string, value: string) => {
    window.localStorage.setItem(`okp-${key}`, value);
  };

  // Lang
  const [lang, setLang] = useState<Lang>(() => {
    const storedLang = window.localStorage.getItem("okp-lang");
    if (storedLang) return (storedLang && locales.includes(storedLang)) ? (storedLang as Lang) : defaultLang;
    setToStore("lang", defaultLang);
    return defaultLang;
  });

  const setStoreLang = (value: Lang) => {
    setToStore("lang", value);
    setLang(value);
  };

  // Topics per page
  const [topicsPerPage, setTopicsPerPage] = useState<number>(() => {
    const storedTopicsPerPage = window.localStorage.getItem("okp-forum-topics-per-page");
    if (storedTopicsPerPage) return parseInt(storedTopicsPerPage);
    setToStore("forum-topics-per-page", FORUM_TOPICS_PER_PAGE.toString());
    return FORUM_TOPICS_PER_PAGE;
  });

  const setStoreTopicsPerPage = (value: number) => {
    setToStore("forum-topics-per-page", value.toString());
    setTopicsPerPage(value);
  };

  // Messages per page
  const [messagesPerPage, setMessagesPerPage] = useState<number>(() => {
    const storedMessagesPerPage = window.localStorage.getItem("okp-forum-messages-per-page");
    if (storedMessagesPerPage) return parseInt(storedMessagesPerPage);
    setToStore("forum-messages-per-page", FORUM_MESSAGES_PER_PAGE.toString());
    return FORUM_MESSAGES_PER_PAGE;
  });

  const setStoreMessagesPerPage = (value: number) => {
    setToStore("forum-messages-per-page", value.toString());
    setMessagesPerPage(value);
  };

  // Return
  return (
    <GameContext.Provider
      value={{
        lang,
        setStoreLang,
        topicsPerPage,
        setStoreTopicsPerPage,
        messagesPerPage,
        setStoreMessagesPerPage,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;