import { createContext, useState } from "react";
import { getStore, setStore } from "./utils";

const FORUM_TOPICS_PER_PAGE = 32;
const FORUM_MESSAGES_PER_PAGE = 32;

interface GameContextType {
  topicsPerPage: number;
  doSetTopicsPerPage: (value: number) => void;
  messagesPerPage: number;
  doSetMessagesPerPage: (value: number) => void;
}

const GameContext = createContext<GameContextType>({
  topicsPerPage: FORUM_TOPICS_PER_PAGE,
  doSetTopicsPerPage: () => {},
  messagesPerPage: FORUM_MESSAGES_PER_PAGE,
  doSetMessagesPerPage: () => {},
});

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);

  // Topics per page
  const [topicsPerPage, setTopicsPerPage] = useState<number>(() => 
    parseInt(getStore("forum-topics-per-page", String(FORUM_TOPICS_PER_PAGE)) || String(FORUM_TOPICS_PER_PAGE))
  );

  const doSetTopicsPerPage = (value: number) => {
    setStore("forum-topics-per-page", value.toString());
    setTopicsPerPage(value);
  };

  // Messages per page
  const [messagesPerPage, setMessagesPerPage] = useState<number>(() => {
    return parseInt(getStore("forum-messages-per-page", String(FORUM_MESSAGES_PER_PAGE)) || String(FORUM_MESSAGES_PER_PAGE))
  });

  const doSetMessagesPerPage = (value: number) => {
    setStore("forum-messages-per-page", value.toString());
    setMessagesPerPage(value);
  };

  if (!isClient) return null;

  // Return
  return (
    <GameContext.Provider
      value={{
        topicsPerPage,
        doSetTopicsPerPage,
        messagesPerPage,
        doSetMessagesPerPage,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;