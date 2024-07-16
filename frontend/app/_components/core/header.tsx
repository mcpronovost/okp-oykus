import type { okpLocale } from "@/app/_lib/i18n/types";
import Image from "next/image";
import Link from "next/link";
import { Bell, Ellipsis, LayoutGrid, Mail, Menu, Smile } from "lucide-react";
import { fontQuicksand } from "@/app/_lib/fonts";
import { getTrans } from "@/app/_lib/i18n";
import imgOykus from "@/app/_assets/img/oykus-w.png";

export default async function CoreHeader({ lang }: { lang: okpLocale}) {
  const t = await getTrans(lang);

  return (
    <header className="okp-core-header">
      <Link href={`/${lang}`} className="okp-brand">
        <div className="okp-logo" style={{ filter: `drop-shadow(#fefefe 0 1000px 0)` }}>
          <Image src={imgOykus} alt="logo" width={52} height={52} />
        </div>
        <div className={`okp-name ${fontQuicksand.className}`}>
          <span>Oykus</span>
        </div>
      </Link>
      <div className={`okp-menu ${fontQuicksand.className}`}>
        <ul>
          <li>
            <button className="okp-toggle-leftbar">
              <LayoutGrid size={24} />
            </button>
          </li>
          <li>
            <Link href={`/${lang}/devblog`}>
              {t.Devblog}
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/faq`}>
              {t.FAQ}
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/contact`}>
              {t.Contact}
            </Link>
          </li>
          <li>
            <button className="okp-toggle-submenu">
              <Ellipsis size={24} />
            </button>
          </li>
        </ul>
      </div>
      <div>level</div>
      <div className={`okp-notifications`}>
        <ul>
          <li>
            <button>
              <Smile size={24} />
            </button>
          </li>
          <li>
            <button>
              <Mail size={24} />
            </button>
          </li>
          <li>
            <button>
              <Bell size={24} />
            </button>
          </li>
        </ul>
      </div>
      <div className={`okp-authuser`}>
        <ul>
          <li>
            <Link href="/login">
              {t.Login}
            </Link>
          </li>
          <li>
            <Link href="/register">
              {t.SignUp}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
