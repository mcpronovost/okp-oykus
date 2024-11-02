import React from "react";
import { LayoutPanelLeft } from "lucide-react";
import { useSideleft } from "@/hooks/core/useSideleft";

export default function SideleftToggle () {
  const { isOpen, toggleSideleft } = useSideleft();

  const handleToggle = () => {
    toggleSideleft(!isOpen);
  };

  return (
    <>
      <section className="okp-toggle">
        <button type="button" onClick={handleToggle} aria-label="Toggle left sidebar">
          <LayoutPanelLeft size={20} />
        </button>
      </section>
    </>
  )
};