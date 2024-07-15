import Image from "next/image";
import Link from "next/link";
import { fontQuicksand } from "@/app/_lib/fonts";

export default function CoreHeader() {
  return (
    <header className="okp-core-header">
      <Link href="/" className="okp-brand">
        <div className="okp-logo">
          <Image src="/oykus-w.png" alt="logo" width={64} height={64} />
        </div>
        <div className={`okp-name ${fontQuicksand.className}`}>
          <span>Oykus</span>
        </div>
      </Link>
      <div>
        <Link href="/g/qalatlan">
          Qalatlan
        </Link>
      </div>
      <div>level</div>
      <div>user</div>
    </header>
  );
}
