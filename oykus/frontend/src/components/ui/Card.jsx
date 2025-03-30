import { Card } from "antd";

export default function OkpCard({ children, className, direction = "column", ...props }) {
  return <Card variant="borderless" className={`okp-card okp-card-direction-${direction} ${className}`} {...props}>{children}</Card>;
}
