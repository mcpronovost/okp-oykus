import { Layout } from "antd";
import { OkpScrollarea, OkpAvatar } from "@/components/ui";

export default function OkpSideGame() {
  const { Sider } = Layout;

  return (
    <Sider
      theme="light"
      width={64}
      reverseArrow
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
        <OkpAvatar
          src={
            "https://placehold.co/48x48"
          }
          alt="Game"
          size={48}
        />
      </OkpScrollarea>
    </Sider>
  );
}
