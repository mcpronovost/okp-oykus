import { useMemo } from "react";
import { Collapse, theme } from "antd";
import { OkpLink } from "@/components/ui";

const { useToken } = theme;

export default function OkpCollapse({
  children,
  arrowAlign = "end",
  bordered = false,
  className = "",
  ...props
}) {
  const { token } = useToken();

  return (
    <Collapse
      bordered={bordered}
      expandIconPosition={arrowAlign}
      className={`okp-collapse ${className}`}
      style={{ "--okp-separator": token.colorBorder }}
      {...props}
    >
      {children}
    </Collapse>
  );
}

export function OkpCollapseLabel({
  children,
  title,
  description,
  icon,
  className = "",
  ...props
}) {
  const Icon = useMemo(() => icon, [icon]);

  return (
    <div className={`okp-collapse-label ${className}`} {...props}>
      {icon && <Icon className="okp-collapse-label-icon" />}
      <div className="okp-collapse-label-text">
        {title && (
          <span className="okp-collapse-label-text-title">{title}</span>
        )}
        {description && (
          <span className="okp-collapse-label-text-description">
            {description}
          </span>
        )}
      </div>
    </div>
  );
}

export function OkpCollapseMenu({ items, className = "", ...props }) {
  return (
    <div className={`okp-collapse-menu ${className}`} {...props}>
      {items.map((item, index) => (
        <OkpLink key={index} className="okp-collapse-menu-item" href={item.href}>
          {item.label}
        </OkpLink>
      ))}
    </div>
  );
}
