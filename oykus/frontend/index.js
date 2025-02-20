import "@/assets/style";
import "@expo/metro-runtime";
import { registerRootComponent } from "expo";
import { initRouter } from "@/services/router";

import App from "./App";

async function initializeApp() {
  await initRouter({
    defaultLang: "en",
    views: [
      {
        name: "Home",
        path: "/",
      },
    ],
    viewsPath: "app/screens",
  });

  // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
  // It also ensures that whether you load the app in Expo Go or in a native build,
  // the environment is set up appropriately
  registerRootComponent(App);
}

initializeApp();
