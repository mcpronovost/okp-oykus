import type { Metadata } from "next";
import type { okpPingAuth } from "@/app/_lib/api/types";
import type { okpLocale } from "@/app/_lib/i18n/types";
import { fontOpenSans } from "@/app/_lib/fonts";
import "@/app/_assets/styles/main.scss";
import { getPing } from "@/app/_lib/api";
import CoreHeader from "@/app/_components/core/Header";
import CoreLeftbar from "@/app/_components/core/Leftbar";
import CoreRighbar from "@/app/_components/core/Righbar";

export const metadata: Metadata = {
  title: "Oykus",
  description: "Oykus project.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: okpLocale };
}>) {
  const lang = params.lang || "fr";
  const ping: okpPingAuth = await getPing();

  return (
    <>
      <html lang={lang}>
        <body className={fontOpenSans.className}>
          <CoreHeader lang={lang} ping={ping} />
          <div className="okp-core-content">
            <CoreLeftbar lang={lang} />
            <main className="okp-core-main">{children}</main>
            <CoreRighbar lang={lang} />
          </div>
        </body>
      </html>
    </>
  );
}
