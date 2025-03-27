import { Card } from "antd";

export default function OkpCard({ children, className, ...props }) {
  return <Card className={`okp-card ${className}`} {...props}>{children}</Card>;
}
