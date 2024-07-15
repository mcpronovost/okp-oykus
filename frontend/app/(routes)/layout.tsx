import type { Metadata } from "next";
import { fontOpenSans } from "@/app/_lib/fonts";
import "@/app/_assets/styles/main.scss";
import Providers from "@/app/_components/Providers";
import CoreHeader from "@/app/_components/core/header";
import CoreLeftbar from "@/app/_components/core/leftbar";
import CoreRighbar from "@/app/_components/core/righbar";

export const metadata: Metadata = {
  title: "Oykus",
  description: "Oykus project.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <html lang="fr">
        <body className={fontOpenSans.className}>
          <CoreHeader />
          <div className="okp-core-content">
            <CoreLeftbar />
            <main className="okp-core-main">
              {children}
            </main>
            <CoreRighbar />
          </div>
        </body>
      </html>
    </>
  );
}
