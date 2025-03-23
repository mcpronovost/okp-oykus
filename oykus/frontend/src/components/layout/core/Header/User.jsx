import { Dropdown, Space } from "antd";
import { LogOut } from "lucide-react";
import { OkpAvatar, OkpLink } from "@/components/ui";

export default function OkpHeaderUser() {
  return (
    <div id="okp-core-header-user">
      <Dropdown
        menu={{
          items: [
            {
              key: "1",
              label: (
                <span>
                  Connecté en tant que<br /><b>John Doe</b>
                </span>
              ),
              disabled: true,
            },
            { type: "divider" },
            {
              key: "2",
              label: "Votre profil",
              disabled: true,
            },
            {
              key: "3",
              label: "Vos personnages",
              disabled: true,
            },
            {
              key: "4",
              label: "Vos mondes",
              disabled: true,
            },
            { type: "divider" },
            {
              key: "5",
              label: "Aide",
              disabled: true,
            },
            {
              key: "6",
              label: "Paramètres",
              disabled: true,
            },
            { type: "divider" },
            {
              key: "7",
              label: (
                <OkpLink href="/logout">
                  Déconnexion
                </OkpLink>
              ),
              icon: <LogOut size={14} />,
            },
          ],
        }}
        trigger={["click"]}
      >
        <Space>
          <span>John Doe</span>
          <OkpAvatar
            src="https://i.pravatar.cc/49"
            size={48}
            strokeColor={"transparent"}
          />
        </Space>
      </Dropdown>
    </div>
  );
}
