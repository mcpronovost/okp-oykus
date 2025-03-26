import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { okpApi, okpEncode, okpDecode } from "@/services/api";

const REFRESH_INTERVAL = 10 * 60 * 5; // 5 minutes
const KEY_SIDE_GAMES_POPULAR = "okp-oykus-side-games-popular";

const InitDataContext = createContext(null);

const InitDataProvider = ({ children, data }) => {
  const initData = useMemo(() => data, []);
  const [sideGamesPopular, setSideGamesPopularState] = useState(() => {
    const r = localStorage.getItem(KEY_SIDE_GAMES_POPULAR);
    return r ? okpDecode(r) : null;
  });

  const setSideGamesPopular = (games) => {
    if (games) {
      const payload = {
        games: games,
        lastUpdate: Date.now(),
      }
      setSideGamesPopularState(payload);
      localStorage.setItem(KEY_SIDE_GAMES_POPULAR, okpEncode(payload));
    } else {
      setSideGamesPopularState(null);
      localStorage.removeItem(KEY_SIDE_GAMES_POPULAR);
    }
  };

  useEffect(() => {
    let mounted = true;
    
    const fetchSideGamesPopular = async () => {
      try {
        const response = await okpApi.get("/game/side/popular/");
        if (mounted && response.success) {
          setSideGamesPopular(response.games);
        }
      } catch (error) {
        console.error("Failed to fetch popular games:", error);
      }
    };

    if (sideGamesPopular?.lastUpdate) {
      const now = Date.now();
      if (now - sideGamesPopular?.lastUpdate > REFRESH_INTERVAL) {
        fetchSideGamesPopular();
      }
    } else {
      fetchSideGamesPopular();
    }

    return () => {
      mounted = false;
    };
  }, [sideGamesPopular]);

  return (
    <InitDataContext.Provider
      value={{
        data: initData,
        sideGamesPopular: sideGamesPopular?.games,
      }}
    >
      {children}
    </InitDataContext.Provider>
  );
};

const useInitData = () => {
  const context = useContext(InitDataContext);
  if (!context) {
    throw new Error("useInitData must be used within an InitDataProvider");
  }
  return context;
};

export { InitDataContext, InitDataProvider, useInitData };
