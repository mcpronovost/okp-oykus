import { Button as AntdButton } from "antd";

export default function OkpButton({ children, className, ...props }) {
  return (
    <AntdButton className={`okp-button ${className}`} {...props}>
      {children}
    </AntdButton>
  );
}
