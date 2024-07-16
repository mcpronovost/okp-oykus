import type { Metadata } from "next";
import { fontOpenSans } from "@/app/_lib/fonts";
import "@/app/_assets/styles/main.scss";
import Providers from "@/app/_components/Providers";
import CoreHeader from "@/app/_components/core/header";
import CoreLeftbar from "@/app/_components/core/leftbar";
import CoreRighbar from "@/app/_components/core/righbar";

interface LangParams {
  lang: string;
};

export const metadata: Metadata = {
  title: "Oykus",
  description: "Oykus project.",
};

export default function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: LangParams;
}>) {
  return (
    <>
      <html lang={params.lang}>
        <body className={fontOpenSans.className}>
          <CoreHeader lang={params.lang} />
          <div className="okp-core-content">
            <CoreLeftbar lang={params.lang} />
            <main className="okp-core-main">
              {children}
            </main>
            <CoreRighbar lang={params.lang} />
          </div>
        </body>
      </html>
    </>
  );
}
