import React from "react";
import { useStore } from "@nanostores/react";
import { LayoutPanelLeft } from "lucide-react";
import Cookies from "js-cookie";
import { sideleftOpenStore } from "@/stores/storeWeb.js";

export default function OkpToggleSideleft () {
  const sideleftOpen = useStore(sideleftOpenStore);

  const handleToggle = (value) => {
    Cookies.set("okp-web-sideleftOpen", value);
    sideleftOpenStore.set(value);
  };

  return (
    <>
      <section className="okp-toggle">
        <button>
          <LayoutPanelLeft size={20} onClick={() => handleToggle(!sideleftOpen)} />
        </button>
      </section>
    </>
  )
};