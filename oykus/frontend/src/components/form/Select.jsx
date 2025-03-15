import "@/assets/styles/form/select.scss";
import { forwardRef } from "react";
import { Select } from "radix-ui";

export const OkpSelectItem = forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item className="okp-select-item" {...props} ref={forwardedRef}>
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="okp-select-item-indicator">
          X
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

export function OkpSelect({ name, placeholder, items, disabled, ...props }) {
  return (
    <Select.Root className="okp-select" disabled={disabled || !items ||items?.length === 0} {...props}>
      <Select.Trigger className="okp-select-trigger">
        <Select.Value placeholder={placeholder} />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="okp-select-content">
          <Select.Viewport className="okp-select-content-viewport">
            {items?.length > 0
              ? items.map((item) => (
                  <OkpSelectItem key={item.value} value={item.value}>
                    {item.label}
                  </OkpSelectItem>
                ))
              : null}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
