import { Menu, Tooltip } from "antd";
import { Bell, Mail, Smile } from "lucide-react";
import { OkpLink } from "@/components/ui";

export default function OkpHeader() {
  const items = [
    {
      key: "1",
      icon: (
        <Tooltip title="Alertes">
          <Bell size={16} />
        </Tooltip>
      ),
    },
    {
      key: "2",
      icon: (
        <Tooltip title="Messages">
          <Mail size={16} />
        </Tooltip>
      ),
    },
    {
      key: "3",
      icon: (
        <Tooltip title="Amis">
          <Smile size={16} />
        </Tooltip>
      ),
    },
  ];

  return (
    <div id="okp-core-header-notifications">
      <Menu mode="horizontal" items={items} style={{ borderBottom: "none" }} />
    </div>
  );
}
