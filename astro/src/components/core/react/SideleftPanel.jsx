import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { Award, ChartNoAxesCombined, House, LibraryBig, MessagesSquare, Scale, Settings, Trophy, Users } from "lucide-react";
import SimpleBarReact from "simplebar-react";
import { sideleftOpenStore } from "@/stores/storeWeb.js";
import imgBanner from "@/assets/img/haven.jpg";
import imgAvatar from "@/assets/img/mc.jpg";

export default function SideleftPanel ({ slug, open }) {
  const sideleftOpen = useStore(sideleftOpenStore);
  const [isOpen, setIsOpen] = useState(open);
  const user = true;

  useEffect(() => {
    setIsOpen(sideleftOpen);
  }, [sideleftOpen]);

  return (
    <>
      <aside id="okp-core-sideleft" className={`okp-scrollable ${isOpen ? "okp-open" : "okp-close"}`}>
        <SimpleBarReact style={{ height: "calc(100vh - 48px)" }}>
          <header className="okp-sideleft-auth">
            {!!user ? (
              <section className="okp-sideleft-auth-display" aria-hidden="true">
                <figure className="okp-sideleft-auth-display-banner">
                  <img src={imgBanner.src} alt="" className="okp-sideleft-auth-display-banner-img" />
                </figure>
                <figure className="okp-sideleft-auth-display-avatar">
                  {false ? (
                    <img src={imgAvatar.src} alt="" className="okp-sideleft-auth-display-avatar-img" />
                  ) : (
                    <span className="okp-sideleft-auth-display-avatar-abbr">MC</span>
                  )}
                </figure>
              </section>
            ) : (
              <div>login</div>
            )}
          </header>
          <nav>
            <ul className="okp-sideleft-main">
              <li>
                <a href="/">
                  <span className="okp-icon" aria-hidden="true">
                    <House size={24} />
                  </span>
                  <span className="okp-text">
                    Home
                  </span>
                </a>
              </li>
              <li>
                <a href="/">
                  <span className="okp-icon" aria-hidden="true">
                    <Trophy size={24} />
                  </span>
                  <span className="okp-text">
                    Succès
                  </span>
                </a>
              </li>
              <li>
                <a href="/">
                  <span className="okp-icon" aria-hidden="true">
                    <Award size={24} />
                  </span>
                  <span className="okp-text">
                    Récompenses
                  </span>
                </a>
              </li>
              <li>
                <a href="/">
                  <span className="okp-icon" aria-hidden="true">
                    <ChartNoAxesCombined size={24} />
                  </span>
                  <span className="okp-text">
                    Classements
                  </span>
                </a>
              </li>
            </ul>
            {!!slug && (
              <ul className="okp-sideleft-game">
                <li>
                  <a href={`/g/${slug}/rules`}>
                    <span className="okp-icon" aria-hidden="true">
                      <Scale size={24} />
                    </span>
                    <span className="okp-text">
                      Règlement
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`/g/${slug}/lore`}>
                    <span className="okp-icon" aria-hidden="true">
                      <LibraryBig size={24} />
                    </span>
                    <span className="okp-text">
                      Contexte
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`/g/${slug}`}>
                    <span className="okp-icon" aria-hidden="true">
                      <MessagesSquare size={24} />
                    </span>
                    <span className="okp-text">
                      Forum
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`/g/${slug}/community`}>
                    <span className="okp-icon" aria-hidden="true">
                      <Users size={24} />
                    </span>
                    <span className="okp-text">
                      Communauté
                    </span>
                  </a>
                </li>
              </ul>
            )}
            <div className="okp-sideleft-space"></div>
            <ul className="okp-sideleft-settings">
              <li>
                <a href="/">
                  <span className="okp-icon" aria-hidden="true">
                    <Settings size={24} />
                  </span>
                  <span className="okp-text">
                    Paramètres
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </SimpleBarReact>
      </aside>
    </>
  );
}