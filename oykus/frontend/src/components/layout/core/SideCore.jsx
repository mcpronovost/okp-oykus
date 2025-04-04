import { useState } from "react";
import { Layout, Menu } from "antd";
import { Home, User, Settings } from "lucide-react";
import { useAuth } from "@/services/auth";
import { OkpAvatar, OkpBanner, OkpScrollarea } from "@/components/ui";

export default function OkpSideCore() {
  const { Sider } = Layout;
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(window.localStorage.getItem("okp-side-collapsed") === "true");

  const handleCollapse = (e) => {
    setCollapsed(e);
    window.localStorage.setItem("okp-side-collapsed", e);
  }

  const items = [
    {
      key: "1",
      label: "Home",
      icon: <Home size={collapsed ? 20 : 14} />,
    },
    {
      key: "2",
      label: "Profile",
      icon: <User size={collapsed ? 20 : 14} />,
    },
    {
      key: "3",
      label: "Settings",
      icon: <Settings size={collapsed ? 20 : 14} />,
    },
  ];

  return (
    <Sider
      id="okp-core-side-core"
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={handleCollapse}
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
        {user && (
          <>
            <OkpBanner src={user.cover || user.avatar} alt="Banner" radius={0} size={collapsed ? 48 : 120} blur={4} opacity={0.5} />
            <OkpAvatar src={user.avatar} alt={user.name} fallback={user.abbr} size={collapsed ? 48 : 120} radius={0} top={collapsed ? -32 : -64} />
          </>
        )}
        <Menu mode="inline" inlineCollapsed={collapsed} items={items} style={{ width: collapsed ? 64 : 300 }} />
      </OkpScrollarea>
    </Sider>
  );
}
