import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";
import { qpabbr } from "@mcpronovost/qpfilters";
import { api, getHeaders } from "@/_lib/api";
import OkpLoading from "@/components/common/Loading";

export default function SidebarPopular() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getPopular = async () => {
    if (!data.length && !isLoading) {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    (async () => {
      getPopular();
    })();
  }, []);

  return (
    <ul className="okp-sidegames okp-popular">
      {!isLoading && data.length ? (
        <>
          <li className="okp-sidegames-icon">
            <Leaf size={24} />
          </li>
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
        </>
      ) : isLoading ? (
        <li className="okp-sidegame">
          <OkpLoading size={32} />
        </li>
      ) : null}
    </ul>
  );
}
