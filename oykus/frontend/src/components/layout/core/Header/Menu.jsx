import { Menu } from "antd";
import { OkpLink } from "@/components/ui";

export default function OkpHeaderMenu() {
  const items = [
    {
      key: "1",
      label: (
        <OkpLink href="/">
          Découvrir
        </OkpLink>
      ),
      disabled: true,
    },
    {
      key: "2",
      label: (
        <OkpLink href="/">
          Parcourir
        </OkpLink>
      ),
      disabled: true,
    },
  ];

  return (
    <div id="okp-core-header-menu">
      <Menu mode="horizontal" items={items} style={{ borderBottom: "none" }} />
    </div>
  );
}
