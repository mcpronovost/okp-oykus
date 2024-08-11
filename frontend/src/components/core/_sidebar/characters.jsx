import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UsersRound } from "lucide-react";
import { qpabbr, qpslug } from "@mcpronovost/qpfilters";
import { api, getHeaders } from "@/_lib/api";
import { getTrans } from "@/_lib/i18n";
import OkpLoading from "@/components/common/Loading";

export default function SidebarCharacters() {
  const t = getTrans();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getCharacters = async () => {
    if (!data.length && !isLoading) {
      setIsLoading(true);
      try {
        const req = await fetch(`${api}/game/side-characters/`, {
          headers: getHeaders(),
        });
        if (!req.ok) {
          throw req.status;
        }
        const response = await req.json();
        if (response.count) setData(response.results);
      } catch (e) {
        console.log("error : ", e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    (async () => {
      getCharacters();
    })();
  }, []);

  return (
    <ul className="okp-sidegames okp-popular">
      {!isLoading && data.length ? (
        <>
          <li className="okp-sidegames-icon">
            <UsersRound size={24} />
          </li>
          {data.map((d) => {
            return (
              <li key={`c-${d.id}`} className="okp-sidegame">
                <Link to={`/c/${d.id}-${qpslug(d.name)}`}>
                  <figure className="okp-sidegame-logo">
                    {!!d.avatar ? (
                      <img src={d.avatar} alt={t("Character's avatar")} className="okp-sidegame-logo-img" />
                    ) : (
                      <span className="okp-sidegame-logo-initial">
                        {qpabbr(d.name)}
                      </span>
                    )}
                  </figure>
                </Link>
              </li>
            );
          })}
        </>
      ) : isLoading ? (
        <li className="okp-sidegame">
          <OkpLoading size={32} />
        </li>
      ) : null}
    </ul>
  );
}
