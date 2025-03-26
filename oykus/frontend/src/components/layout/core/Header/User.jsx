import { Dropdown, Space } from "antd";
import { LogOut } from "lucide-react";
import { useAuth } from "@/services/auth";
import { useTranslation } from "@/services/translation";
import { OkpAvatar, OkpLink } from "@/components/ui";

export default function OkpHeaderUser() {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <div id="okp-core-header-user">
      <Dropdown
        menu={{
          items: [
            {
              key: "1",
              label: (
                <span>
                  {t("Connected as")}<br /><b>{user.name}</b>
                </span>
              ),
              disabled: true,
            },
            { type: "divider" },
            {
              key: "2",
              label: t("Your Profile"),
              disabled: true,
            },
            {
              key: "3",
              label: t("Your Characters"),
              disabled: true,
            },
            {
              key: "4",
              label: t("Your Worlds"),
              disabled: true,
            },
            { type: "divider" },
            {
              key: "5",
              label: t("Help"),
              disabled: true,
            },
            {
              key: "6",
              label: t("Settings"),
              disabled: true,
            },
            { type: "divider" },
            {
              key: "7",
              label: (
                <OkpLink href="logout">
                  {t("Logout")}
                </OkpLink>
              ),
              icon: <LogOut size={14} />,
            },
          ],
        }}
        trigger={["click"]}
      >
        <Space>
          <span id="okp-core-header-user-name">{user.name}</span>
          <OkpAvatar
            src={user.avatar}
            size={48}
            strokeColor={"transparent"}
          />
        </Space>
      </Dropdown>
    </div>
  );
}
