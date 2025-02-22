import { useState, useEffect } from "react";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import routes from "./routes";
import { getLangAndUri, getRoute } from "./utils";

export const routerConfig = {
  defaultLang: "fr",
  currentLang: "fr",
  supportedLangs: ["en", "fr"],
};

const defaultUrl =
  Platform.OS === "web"
    ? window.location.pathname
    : `/${routerConfig.defaultLang}/`;
const { uri: defaultPath } = getLangAndUri(defaultUrl);

/**
 * Custom hook for managing the router
 * @returns {Object} - The router object
 */
export function useRouter() {
  const [isReady, setIsReady] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [lang, setLang] = useState(routerConfig.defaultLang);
  const [path, setPath] = useState(defaultPath);
  const [route, setRoute] = useState(["home", routes.home]);
  const [screen, setScreen] = useState(null);

  /**
   * Updates the history
   * @param {string} newUrl - The new URL
   * @returns {void}
   */
  const updateHistory = (newUrl) => {
    if (Platform.OS === "web") {
      if (history.length === 0 || (historyIndex >= (history.length - 1))) {
        addHistory(newUrl);
      } else {
        const updatedHistory = history.map(([p, _], i) => [p, i === historyIndex]);
        setHistory(updatedHistory);
      }
    }
  };

  /**
   * Adds a new path to the history
   * @param {string} path - The path to add
   * @returns {void}
   */
  const addHistory = (path) => {
    if (Platform.OS === "web") {
      const updatedHistory = history.map(([p, _]) => [p, false]);
      setHistory([...updatedHistory, [path, true]]);
      setHistoryIndex(updatedHistory.length > 0 ? updatedHistory.length : 0);
    }
  };

  /**
   * Updates the history index
   * @param {number} index - The index to update
   * @returns {void}
   */
  const updateHistoryIndex = (index) => {
    if (Platform.OS === "web") {
      setHistoryIndex(index);
    }
  };

  /**
   * Updates the language based on the path
   * @returns {void}
   */
  const updateLang = async () => {
    if (Platform.OS === "web") {
      const path = window.location.pathname;
      const { langCode, uri } = getLangAndUri(path);

      if (!langCode || !routerConfig.supportedLangs.includes(langCode)) {
        window.location.href = `/${routerConfig.defaultLang}/${
          uri || path.slice(1)
        }`;
        return;
      }

      if (langCode !== lang) {
        setLang(langCode);
      }

      document.documentElement.lang = langCode;
    } else {
      try {
        const storedLangCode = await AsyncStorage.getItem("langCode");

        if (
          storedLangCode &&
          routerConfig.supportedLangs.includes(storedLangCode)
        ) {
          setLang(storedLangCode);
        } else {
          await AsyncStorage.setItem("langCode", routerConfig.defaultLang);
          setLang(routerConfig.defaultLang);
        }
      } catch (e) {
        console.error("Failed to update language on native platform:", e);
      }
    }
  };

  /**
   * Updates the route based on the path and language
   * @returns {void}
   */
  const updateRoute = () => {
    const currentRoute = getRoute(path, lang, routes);
    if (!currentRoute) {
      setRoute(["error404", routes.error404]);
      return;
    }
    setRoute(currentRoute);
  };

  /**
   * Updates the screen based on the route
   * @returns {void}
   */
  const updateScreen = async () => {
    if (!route || !route[1] || !route[1].component) {
      setScreen(null);
      return;
    }

    try {
      const screenModule = await route[1].component();
      setScreen(screenModule || null);
    } catch (error) {
      console.error(`Failed to load screen component: ${route[0]}`, error);
      setScreen(null);
    }
  };

  /**
   * Navigates to a new path
   * @param {string} payload - The path to navigate to
   * @returns {void}
   */
  const go = (payload) => {
    if (Platform.OS === "web") {
      window.history.pushState({}, "", `/${lang}/${payload}`);
    }
    if (Platform.OS !== "web") {
      if (!(history.length === 0) && !(historyIndex === (history.length - 1))) {
        const newHistory = history.slice(0, historyIndex + 1);
        setHistory(newHistory);
        setHistoryIndex(historyIndex + 1);
      }
    }
    setPath(payload);
  };

  /**
   * Navigates back to the previous path
   * @returns {void}
   */
  const goBack = () => {
    if (Platform.OS === "web") {
      window.history.back();
    }
    if (Platform.OS !== "web") {
      if (historyIndex <= 0) return;
      const previousUrl = history[historyIndex - 1][0];
      const { langCode, uri } = getLangAndUri(previousUrl);
      updateHistoryIndex(historyIndex - 1);
      setLang(langCode);
      setPath(uri || path.slice(1));
    }
  };

  /**
   * Handles the popstate event on the web platform
   * @returns {void}
   */
  useEffect(() => {
    if (Platform.OS === "web") {
      const handlePopState = () => {
        const { uri: newPath } = getLangAndUri(window.location.pathname);
        setPath(newPath);
      };

      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, []);

  /**
   * Updates the language based on the path
   * @returns {void}
   */
  useEffect(() => {
    updateLang();
  }, []);

  /**
   * Updates the route based on the path and language
   * @returns {void}
   */
  useEffect(() => {
    updateRoute();
    if (Platform.OS !== "web") {
      updateHistory(`/${lang}/${path}`);
    }
  }, [lang, path]);

  /**
   * Updates the screen based on the route
   * @returns {void}
   */
  useEffect(() => {
    updateScreen();
  }, [route]);

  /**
   * Sets the isReady state to true when the screen is ready
   * @returns {void}
   */
  useEffect(() => {
    if (screen) {
      setIsReady(true);
    }
  }, [screen]);

  return { isReadyRouter: isReady, history, historyIndex, lang, path, route, screen, go, goBack };
}
