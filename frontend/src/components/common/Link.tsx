import type { ReactNode } from "react";
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
  const lang = getLang();
  const t = getTrans();
  if (href != "/") href = t(href);
  if (href == "/" && lang != defaultLang) href = `/${lang}`;
  else if (lang != defaultLang) href = `/${lang}${href}`;

  return (
    <>
      <a href={href} className={className}>
        {children}
      </a>
    </>
  );
}
