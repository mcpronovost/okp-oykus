import type { okpPingAuth } from "@/app/_lib/api/types";
import type { okpLocale } from "@/app/_lib/i18n/types";
// ===---
import { cookies, headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  Ellipsis,
  LayoutGrid,
  LogIn,
  Mail,
  Menu,
  Smile,
} from "lucide-react";
// ===---
import { api, apiHeaders } from "@/app/_lib/api";
import { fontQuicksand } from "@/app/_lib/fonts";
import { getTrans } from "@/app/_lib/i18n";
import ToggleLeftbar from "@/app/_components/core/header/ToggleLeftbar";
import imgOykus from "@/app/_assets/img/oykus-w.png";

type Props = {
  lang: okpLocale,
  ping: okpPingAuth
};

export default async function CoreHeader({ lang, ping }: Props) {
  const t = await getTrans(lang);
  const isAuth = ping.auth;

  return (
    <header className="okp-core-header">
      <Link href={`/${lang}`} className="okp-brand">
        <div className="okp-logo">
          <Image src={imgOykus} alt="logo" width={52} height={52} priority={true} />
        </div>
        <div className={`okp-name ${fontQuicksand.className}`}>
          <span>Oykus</span>
        </div>
      </Link>
      <div className={`okp-menu ${fontQuicksand.className}`}>
        <ul>
          {isAuth && (
            <li>
              <ToggleLeftbar />
            </li>
          )}
          <li>
            <Link href={`/${lang}/devblog`}>{t.Devblog}</Link>
          </li>
          <li>
            <Link href={`/${lang}/faq`}>{t.FAQ}</Link>
          </li>
          <li>
            <Link href={`/${lang}/contact`}>{t.Contact}</Link>
          </li>
          <li>
            <button className="okp-toggle-submenu">
              <Ellipsis size={24} />
            </button>
          </li>
        </ul>
      </div>
      <div>
        {isAuth && (
          <div>
            <span>level</span>
          </div>
        )}
      </div>
      <div className={`okp-notifications`}>
        {isAuth && (
          <ul>
            <li>
              <button>
                <Bell size={24} />
              </button>
            </li>
            <li>
              <button>
                <Mail size={24} />
              </button>
            </li>
            <li>
              <button>
                <Smile size={24} />
              </button>
            </li>
          </ul>
        )}
      </div>
      {isAuth ? (
        <div className={`okp-authuser`}>
          <ul>
            <li>
              <Link href="/logout">{t.Logout}</Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className={`okp-unauthuser`}>
          <ul>
            <li>
              <Link href="/login" className="okp-login">
                <LogIn size={24} />
                <span className="okp-nearicon">{t.Login}</span>
              </Link>
            </li>
            <li>
              <Link href="/signup" className="okp-signup">
                <span>{t.SignUp}</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
