"use client";

import { useContext } from "react";
import { LayoutGrid } from "lucide-react";
import StoreContext from "@/app/_lib/store";

export default function ToggleLeftbar() {
  const { toggleSidebar, setStoreToggleSidebar } = useContext(StoreContext);

  const doSetToggle = () => {
    setStoreToggleSidebar(!toggleSidebar);
  };

  return (
    <>
      <button onClick={doSetToggle} className="okp-toggle-leftbar">
        <LayoutGrid size={24} />
      </button>
    </>
  );
}
