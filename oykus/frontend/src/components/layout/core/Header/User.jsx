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
                <OkpLink href={`players/${user.slug}`}>
                  {t("Connected as")}<br /><b>{user.name}</b>
                </OkpLink>
              ),
            },
            { type: "divider" },
            {
              key: "2",
              label: (
                <OkpLink href="me/profile">
                  {t("Your Profile")}
                </OkpLink>
              ),
              disabled: true,
            },
            {
              key: "3",
              label: (
                <OkpLink href="m/characters">
                  {t("Your Characters")}
                </OkpLink>
              ),
            },
            {
              key: "4",
              label: (
                <OkpLink href="m/games">
                  {t("Your Games")}
                </OkpLink>
              ),
            },
            { type: "divider" },
            {
              key: "5",
              label: (
                <OkpLink href="help">
                  {t("Help")}
                </OkpLink>
              ),
              disabled: true,
            },
            {
              key: "6",
              label: (
                <OkpLink href="settings">
                  {t("Settings")}
                </OkpLink>
              ),
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
