import { useMemo } from "react";
import { Orbit, MessagesSquare, Paintbrush } from "lucide-react";
import { useTranslation } from "@/services/translation";
import { OkpCard, OkpCollapse, OkpCollapseLabel, OkpCollapseMenu } from "@/components/ui";

export default function OkpAuthGamesMenu({ gameId, defaultActiveKey = 1, activeItem = "edit" }) {
  const { t } = useTranslation();

  const items = useMemo(() => {
    return [
      {
        key: "1",
        label: (
          <OkpCollapseLabel
            title={t("Game Information")}
            description={t("Title, description, cover, visibility, and more")}
            icon={Orbit}
          />
        ),
        children: (
          <OkpCollapseMenu
            items={[
              {
                label: t("General"),
                href: `a/games/${gameId}/edit`,
                active: activeItem === "edit",
              },
              {
                label: t("Deletion"),
                href: `a/games/${gameId}/deletion`,
                active: activeItem === "deletion",
              }
            ]}
          />
        ),
      },
      {
        key: "2",
        label: (
          <OkpCollapseLabel
            title={t("Forum")}
            description={t("Categories, sections, permissions, and settings")}
            icon={MessagesSquare}
          />
        ),
        children: (
          <OkpCollapseMenu
            items={[
              {
                label: t("General"),
                href: `a/games/${gameId}/forum`,
                active: activeItem === "forum-general",
              },
              {
                label: t("Structure"),
                href: `a/games/${gameId}/forum/structure`,
                active: activeItem === "forum-structure",
              },
            ]}
          />
        ),
      },
      {
        key: "3",
        label: (
          <OkpCollapseLabel
            title={t("Style")}
            description={t("Colours and custom stylesheet")}
            icon={Paintbrush}
          />
        ),
        children: (
          <OkpCollapseMenu
            items={[
              {
                label: t("General"),
                href: `a/games/${gameId}/style`,
                active: activeItem === "style-general",
              },
              {
                label: t("Stylesheet"),
                href: `a/games/${gameId}/style/stylesheet`,
                active: activeItem === "style-stylesheet",
              },
            ]}
          />
        ),
      },
    ];
  }, []);

  return (
    <OkpCard>
      <OkpCollapse items={items} defaultActiveKey={[defaultActiveKey]} />
    </OkpCard>
  );
}
