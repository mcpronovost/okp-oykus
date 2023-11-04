import { useTranslation } from "@/plugins/i18n";
import HomeView from "@/views/Home.jsx";
import ProfileView from "@/views/Profile.jsx";
import ErrorView from "@/views/Error.jsx";

export const routes = [
  {
    uri: "/",
    view: () => (HomeView),
    meta: {
      title: "Home",
    }
  },
  {
    uri: "/profile/",
    view: () => (ProfileView),
    meta: {
      title: "Profile",
    }
  }
];

export const getRoute = (path, lang) => {
  if (path.substr(-1) != "/") path += "/";
  const t = useTranslation(lang);
  const route = routes.find((r) => {
    return `/${lang}${t(r.uri)}` === path;
  });
  if (!route) return {view: () => (ErrorView)};
  return route;
};
