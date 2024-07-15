import Link from "next/link";
import { Award, UsersRound } from "lucide-react";

export default function CoreLeftbar() {
  return (
    <nav className={`okp-core-leftbar okp-close`}>
      <div>leftbar</div>
      <ul className="okp-links">
        <li>
          <Link href="/">
            <UsersRound size={32} />
          </Link>
        </li>
        <li>
          <Link href="/">
            <Award size={32} />
          </Link>
        </li>
      </ul>
      <div>
        foot
      </div>
    </nav>
  );
}
