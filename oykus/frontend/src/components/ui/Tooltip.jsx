import { Tooltip } from "antd";

export default function OkpTooltip({ children, ...props }) {
  return (
    <Tooltip mouseEnterDelay={0.2} mouseLeaveDelay={0.5} {...props}>
      {children}
    </Tooltip>
  );
}
