import { Bell, Mail, Smile } from "lucide-react";
import { getTrans } from "@/_lib/i18n";

export default function HeaderNotifications() {
  const t = getTrans();

  return (
    <div className="okp-notifications">
      <ul>
        <li>
          <button aria-label={t("PrivateMessages")} className="okp-notifications-btn">
            <Mail size={24} />
          </button>
        </li>
        <li>
          <button aria-label={t("Notifications")} className="okp-notifications-btn">
            <Bell size={24} />
          </button>
        </li>
        <li>
          <button aria-label={t("Friends")} className="okp-notifications-btn">
            <Smile size={24} />
          </button>
        </li>
      </ul>
    </div>
  );
}
