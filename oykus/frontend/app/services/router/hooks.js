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

export function useRouter() {
  const [isReady, setIsReady] = useState(false);
  const [lang, setLang] = useState(routerConfig.defaultLang);
  const [path, setPath] = useState(defaultPath);
  const [route, setRoute] = useState(["home", routes.home]);
  const [screen, setScreen] = useState(null);

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

  const go = (payload) => {
    if (Platform.OS === "web") {
      window.history.pushState({}, "", `/${lang}/${payload}`);
    }
    setPath(payload);
  };

  useEffect(() => {
    updateLang();
  }, []);

  useEffect(() => {
    updateRoute();
  }, [lang, path]);

  useEffect(() => {
    updateScreen();
  }, [route]);

  useEffect(() => {
    if (screen) {
      setIsReady(true);
    }
  }, [screen]);

  return { isReadyRouter: isReady, lang, path, route, screen, go };
}
