"use client";

import { useEffect, useState } from "react";
import { LayoutGrid } from "lucide-react";
import { setCookie, getCookie } from "@/app/_lib/client";

export default function Navbar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieToggleLeftbar = Number(getCookie("okp-toggle-leftbar") || 0);
  const [ toggleLeftbar, setToggleLeftbar ] = useState(cookieToggleLeftbar);
  console.log("nav cookie : ", toggleLeftbar);

  useEffect(() => {
    console.log("nav cookie : ", toggleLeftbar);
  }, [cookieToggleLeftbar]);

  return (
    <>
      <nav className={`okp-core-leftbar ${toggleLeftbar ? "okp-open" : "okp-close"}`}>
        {children}
      </nav>
    </>
  );
}
