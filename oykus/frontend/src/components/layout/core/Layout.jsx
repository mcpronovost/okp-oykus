import { useState } from "react";
import { Layout } from "antd";
import { OkpScrollarea } from "@/components/ui";
import OkpSideCore from "./SideCore";

export default function OkpLayout({ children }) {
  const { Header, Sider, Content } = Layout;
  const [collapsedGameBar, setCollapsedGameBar] = useState(true);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{
          display: "flex",
          width: "100%",
          height: 64,
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}>
        header
      </Header>
      <Layout hasSider>
        <OkpSideCore />
        <Content style={{
            overflow: "auto",
            maxHeight: "calc(100vh - 64px)",
          }}>
          <OkpScrollarea>
            {children}
          </OkpScrollarea>
        </Content>
        <Sider collapsible collapsed={collapsedGameBar} onCollapse={(value) => setCollapsedGameBar(value)} width={120} collapsedWidth={64} reverseArrow>
          sider
        </Sider>
      </Layout>
    </Layout>
  );
}
