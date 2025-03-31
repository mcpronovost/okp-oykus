import { Card } from "antd";

export default function OkpCard({
  children,
  className,
  direction = "column",
  padding = 0,
  ...props
}) {
  return (
    <Card
      variant="borderless"
      className={`okp-card okp-card-direction-${direction} ${className}`}
      style={{ padding: `${padding}px` }}
      {...props}
    >
      {children}
    </Card>
  );
}
