import { Bell, Mail, Smile } from "lucide-react";
// import { getTrans } from "@/_lib/i18n";
// import Link from "@/components/common/Link";

export default function HeaderNotifications() {

  return (
    <div className="okp-notifications">
      <ul>
        <li>
          <button className="okp-notifications-btn">
            <Mail size={24} />
          </button>
        </li>
        <li>
          <button className="okp-notifications-btn">
            <Bell size={24} />
          </button>
        </li>
        <li>
          <button className="okp-notifications-btn">
            <Smile size={24} />
          </button>
        </li>
      </ul>
    </div>
  );
}
