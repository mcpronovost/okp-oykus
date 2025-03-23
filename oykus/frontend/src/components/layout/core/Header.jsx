import { ConfigProvider, Layout, Menu, theme } from "antd";

const { useToken } = theme;

export default function OkpHeader() {
  const { Header } = Layout;
  const { token } = useToken();

  const items = [
    {
      key: "1",
      label: "Découvrir",
    },
    {
      key: "2",
      label: "Parcourir",
    },
  ];

  return (
    <Header
      theme="light"
      style={{
        display: "flex",
        width: "100%",
        height: 64,
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <ConfigProvider theme={{
        components: {
          Menu: {
            itemBg: token.Layout.headerBg,
            itemHeight: 64,
          },
        },
      }}>
        <Menu mode="horizontal" items={items} style={{ borderBottom: "none" }} />
      </ConfigProvider>
    </Header>
  );
}
