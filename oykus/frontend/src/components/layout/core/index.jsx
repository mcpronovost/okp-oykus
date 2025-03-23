import { Layout } from "antd";
import { OkpScrollarea } from "@/components/ui";
import OkpHeader from "./Header";
import OkpSideCore from "./SideCore";
import OkpSideGame from "./SideGame";

export default function OkpLayout({ children }) {
  const { Content } = Layout;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <OkpHeader />
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
        <OkpSideGame />
      </Layout>
    </Layout>
  );
}
