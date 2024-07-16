import type { okpLocale } from "@/app/_lib/i18n/types";
import Image from "next/image";
import Link from "next/link";
import { Flame } from "lucide-react";
import { fontQuicksand } from "@/app/_lib/fonts";
import { getTrans } from "@/app/_lib/i18n";
import imgOykus from "@/app/_assets/img/oykus-w.png";
import imgMcpk from "@/app/_assets/img/mcpk.jpg";

export default async function CoreRighbar({ lang }: { lang: okpLocale }) {
  const t = await getTrans(lang);

  return (
    <nav className={`okp-core-righbar ${fontQuicksand.className}`}>
      <ul className="okp-navigation okp-games">
        <li>
          <Link href={`/${lang}/g/qalatlan`} style={{backgroundColor: "#699212", color: "#fff"}}>
            <span>Q</span>
          </Link>
        </li>
        <li>
          <Link href={`/${lang}/achievements`}>
            <Image src={imgMcpk} alt="logo" width={40} height={40} />
          </Link>
        </li>
      </ul>
      <ul className="okp-navigation okp-users">
        <li>
          <Link href={`/${lang}/achievements`}>
            <Image src={imgOykus} alt="logo" width={40} height={40} />
          </Link>
        </li>
        <li>
          <Link href={`/${lang}/achievements`}>
            <Image src={imgMcpk} alt="logo" width={40} height={40} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
