import type { ReactNode } from "react";
import { useContext } from "react";
import RouterContext from "@/_lib/router";
import { defaultLang, getLang, getTrans } from "@/_lib/i18n";

type Props = {
  children: ReactNode;
  href: string;
  className?: string;
};

export default function CommonLink({
  children,
  href,
  className,
}: Props): ReactNode {
  const { goRoute } = useContext(RouterContext);
  const lang = getLang();
  const t = getTrans();
  if (href != "/") href = t(href);
  if (href == "/" && lang != defaultLang) href = `/${lang}`;
  else if (lang != defaultLang) href = `/${lang}${href}`;

  function doClick (e) {
    e.preventDefault();
    goRoute(href);
  };

  return (
    <>
      <a href={href} className={className} onClick={doClick}>
        {children}
      </a>
    </>
  );
}
