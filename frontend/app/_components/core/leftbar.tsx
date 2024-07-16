import Link from "next/link";
import { Award, BarChart3, Orbit, Settings, UsersRound } from "lucide-react";
import { getTrans } from "@/app/_lib/i18n";

export default async function CoreLeftbar({ lang }: { lang: string }) {
  const t = await getTrans(lang);

  return (
    <nav className={`okp-core-leftbar okp-close`}>
      <div>params</div>
      <ul className="okp-navigation">
        <li>
          <Link href={`/${lang}/cynosts`}>
            <Orbit size={24} />
            <span className="okp-link-name">
              {t.Cynosts}
            </span>
          </Link>
        </li>
        <li>
          <Link href={`/${lang}/community`}>
            <UsersRound size={24} />
            <span className="okp-link-name">
              {t.Community}
            </span>
          </Link>
        </li>
        <li>
          <Link href={`/${lang}/achievements`}>
            <Award size={24} />
            <span className="okp-link-name">
              {t.Achievements}
            </span>
          </Link>
        </li>
        <li>
          <Link href={`/${lang}/rankings`}>
            <BarChart3 size={24} />
            <span className="okp-link-name">
              {t.Rankings}
            </span>
          </Link>
        </li>
      </ul>
      <ul className="okp-navigation">
        <li>
          <Link href={`/${lang}/settings`}>
            <Settings size={24} />
            <span className="okp-link-name">
              {t.Settings}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
