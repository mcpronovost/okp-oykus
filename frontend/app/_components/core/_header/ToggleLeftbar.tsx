"use client";

import { useEffect, useState } from "react";
import { LayoutGrid } from "lucide-react";
import { setCookie, getCookie } from "@/app/_lib/client";

export default function ToggleLeftbar() {
  const cookieToggleLeftbar = getCookie("okp-toggle-leftbar");
  const [ toggleLeftbar, setToggleLeftbar ] = useState(cookieToggleLeftbar);

  const doSetToggle = () => {
    const result = cookieToggleLeftbar == 1 ? 0 : 1;
    setCookie("okp-toggle-leftbar", result, 30);
    setToggleLeftbar(result);
  };

  useEffect(() => {
    console.log("cookie : ", cookieToggleLeftbar);
  }, [toggleLeftbar]);

  return (
    <>
      <button onClick={doSetToggle} className="okp-toggle-leftbar">
        <LayoutGrid size={24} />
      </button>
    </>
  );
}
