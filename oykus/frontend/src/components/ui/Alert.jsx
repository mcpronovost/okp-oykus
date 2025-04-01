import { Alert } from "antd";

export default function OkpAlert({ children, className, showIcon = true, ...props }) {
  return (
    <Alert className={`okp-alert ${className}`} showIcon={showIcon} {...props}>
      {children}
    </Alert>
  );
}
