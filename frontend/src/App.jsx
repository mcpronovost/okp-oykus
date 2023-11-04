import { getLang } from "@/plugins/i18n";
import { getRoute } from "@/plugins/router";
import "@/assets/styles/App.css";

const lang = getLang(window.location);
const view = getRoute(window.location.pathname, lang).view();

const App = view;

export default App;
