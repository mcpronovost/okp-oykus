import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { House, LibraryBig, MessagesSquare, Scale, Settings, Users } from "lucide-react";
import { sideleftOpenStore } from "@/stores/storeWeb.js";

export default function SideleftPanel ({ slug, open }) {
  const sideleftOpen = useStore(sideleftOpenStore);
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(sideleftOpen);
  }, [sideleftOpen]);

  return (
    <>
      <aside id="okp-core-sideleft" className={isOpen ? "okp-open" : "okp-close"}>
        <nav className="okp-sideleft-main">
          <ul>
            <li>
              <a href="/">
                <House size="24" />
              </a>
            </li>
          </ul>
        </nav>
        {!!slug && (
          <nav className="okp-sideleft-game">
            <ul>
              <li>
                <a href={`/g/${slug}/rules`}>
                  <Scale size="24" />
                </a>
              </li>
              <li>
                <a href={`/g/${slug}/lore`}>
                  <LibraryBig size="24" />
                </a>
              </li>
              <li>
                <a href={`/g/${slug}`}>
                  <MessagesSquare size="24" />
                </a>
              </li>
              <li>
                <a href={`/g/${slug}/community`}>
                  <Users size="24" />
                </a>
              </li>
            </ul>
          </nav>
        )}
        <nav className="okp-sideleft-settings">
          <ul>
            <li>
              <a href="/">
                <Settings size="24" />
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}