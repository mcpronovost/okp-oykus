import { useContext } from "react";
import RouterContext from "@/plugins/router";

const OkpRouteLink = ({ children, route, classes, style, arialabel }) => {
  const { goRoute } = useContext(RouterContext);

  const handleGoRoute = (e) => {
    e.preventDefault();
    goRoute(route);
    return false;
  };

  return (
    <a href={route} onClick={handleGoRoute} className={classes || null} style={style || null} aria-label={arialabel || null}>
      { children }
    </a>
  );
};

export default OkpRouteLink;
  