import { Orbit, MessagesSquare, Paintbrush } from "lucide-react";
import { OkpCard, OkpCollapse, OkpCollapseLabel, OkpCollapseMenu } from "@/components/ui";

const items = [
  {
    key: "1",
    label: (
      <OkpCollapseLabel
        title="Game Information"
        description="Title, description, cover, visibility, and more"
        icon={Orbit}
      />
    ),
    children: (
      <OkpCollapseMenu
        items={[
          {
            label: "General",
            href: "#",
          },
        ]}
      />
    ),
  },
  {
    key: "2",
    label: (
      <OkpCollapseLabel
        title="Forum"
        description="Categories, sections, permissions, and settings"
        icon={MessagesSquare}
      />
    ),
    children: (
      <OkpCollapseMenu
        items={[
          {
            label: "General",
            href: "#",
          },
          {
            label: "Index",
            href: "#",
          },
        ]}
      />
    ),
  },
  {
    key: "3",
    label: (
      <OkpCollapseLabel
        title="Style"
        description="Colours and custom stylesheet"
        icon={Paintbrush}
      />
    ),
    children: (
      <OkpCollapseMenu
        items={[
          {
            label: "General",
            href: "#",
          },
          {
            label: "Stylesheet",
            href: "#",
          },
        ]}
      />
    ),
  },
];

export default function OkpAuthGamesMenu() {
  return (
    <OkpCard>
      <OkpCollapse items={items} defaultActiveKey={["1"]} />
    </OkpCard>
  );
}
