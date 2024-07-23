import type { okpPingAuth } from "@/app/_lib/api/types";
import type { okpLocale } from "@/app/_lib/i18n/types";
// ===---
import Image from "next/image";
import Link from "next/link";
import { Heart, Users } from "lucide-react";
// ===---
import { fontQuicksand } from "@/app/_lib/fonts";
import { getTrans } from "@/app/_lib/i18n";
import imgOykus from "@/app/_assets/img/oykus-w.png";
import imgMcpk from "@/app/_assets/img/mcpk.jpg";

type Props = {
  lang: okpLocale;
  ping: okpPingAuth;
};

export default async function CoreRighbar({ lang, ping }: Props) {
  const t = await getTrans(lang);
  const isAuth = ping.auth;
  const hasUsers = false;

  return (
    <nav className={`okp-core-righbar ${fontQuicksand.className}`}>
      {isAuth && (
        <ul className="okp-navigation okp-games">
          <li>
            <Link href={`/${lang}`}>
              <Heart size={24} />
            </Link>
          </li>
          <li>
            <Link
              href={`/${lang}/g/qalatlan`}
              style={{ backgroundColor: "#699212", color: "#fff" }}
            >
              <span>Q</span>
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/achievements`}>
              <Image src={imgMcpk} alt="logo" width={40} height={40} />
            </Link>
          </li>
        </ul>
      )}
      {hasUsers && (
        <ul className="okp-navigation okp-users">
          <li>
            <Link href={`/${lang}`}>
              <Users size={24} />
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/achievements`}>
              <Image src={imgMcpk} alt="logo" width={40} height={40} />
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
