import { Tag } from "antd";

export default function OkpTag({ children, bordered = false, color = "" }) {
  return <Tag bordered={bordered} color={color}>{children}</Tag>;
}

