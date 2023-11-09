import { useContext } from "react";
import RouterContext from "@/plugins/router";

const OkpRouteLink = ({ children, route, classes, arialabel }) => {
  const { goRoute } = useContext(RouterContext);

  const handleGoRoute = (e) => {
    e.preventDefault();
    goRoute(route);
    return false;
  };

  return (
    <a href={route} onClick={handleGoRoute} className={classes ? classes : null} aria-label={arialabel ? arialabel : null}>
      { children }
    </a>
  );
};

export default OkpRouteLink;
  