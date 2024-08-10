import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { qpabbr } from "@mcpronovost/qpfilters";
import { api, getHeaders } from "@/_lib/api";

export default function SidebarPopular() {
  const [data, setData] = useState([]);

  const getPopular = async () => {
    try {
      const req = await fetch(`${api}/game/side-popular/`, {
        headers: getHeaders(),
      });
      if (!req.ok) {
        throw req.status;
      }
      const response = await req.json();
      if (response.count) setData(response.results);
    } catch (e) {
      console.log("error : ", e);
    }
  };

  useEffect(() => {
    (async () => {
      getPopular();
    })();
  }, []);

  return (
    <ul className="okp-sidegames okp-popular">
      {data.map((game) => {
        return (
          <li key={`g-${game.id}`} className="okp-sidegame">
            <Link to={`/g/${game.slug}`}>
              <figure className="okp-sidegame-logo">
                <span className="okp-sidegame-logo-initial">
                  {qpabbr(game.name)}
                </span>
              </figure>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
