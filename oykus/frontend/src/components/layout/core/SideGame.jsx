import { Layout, Tooltip } from "antd";
import { OkpScrollarea, OkpAvatar, OkpLink } from "@/components/ui";
import imgPachua from "@/assets/img/pachua.jpg";

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
        <Tooltip title="Pachu'a Wapi-Qatlaalawsiq" placement="left">
          <OkpLink href="/w/oykus/characters/01-pachua-wapi-qatlaalawsiq/">
            <OkpAvatar src={imgPachua} alt="Game" size={48} />
          </OkpLink>
        </Tooltip>
      </OkpScrollarea>
    </Sider>
  );
}
