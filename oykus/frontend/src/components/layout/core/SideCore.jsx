import { useState } from "react";
import { Layout } from "antd";
import { OkpBanner, OkpScrollarea } from "@/components/ui";

export default function OkpSideCore() {
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={300}
      collapsedWidth={64}
      style={{
        height: "100vh",
        position: "sticky",
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: "thin",
        scrollbarGutter: "stable",
      }}
    >
      <OkpScrollarea>
        <OkpBanner src={"https://mcpronovost.pythonanywhere.com/media/players/banners/43543543.png"} alt="Banner" fade radius={0} size={120} blur={0} opacity={0.5} />
      </OkpScrollarea>
    </Sider>
  );
}
