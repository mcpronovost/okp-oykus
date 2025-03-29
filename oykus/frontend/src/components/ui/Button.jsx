import { Button as AntdButton } from "antd";

export default function OkpButton({ children, ...props }) {
  return (
    <AntdButton className="okp-button" {...props}>
      {children}
    </AntdButton>
  );
}
