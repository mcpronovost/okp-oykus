import { Form, Input, Select, Checkbox, Upload, ColorPicker } from "antd";

const getValueFromEvent = e => {
  if (Array.isArray(e)) {
    return e;
  }
  return e === null || e === void 0 ? void 0 : e.fileList;
};

export default function OkpField({
  name,
  label,
  tooltip,
  placeholder,
  maxLength,
  showCount = false,
  inputType = "input",
  options = [],
  rows = 4,
  size = "default",
  required = false,
  disabled = false,
  hasFeedback = true,
  children,
  style,
  ...props
}) {
  return (
    <Form.Item
      name={name}
      label={label}
      tooltip={tooltip}
      rules={[{ required: required }]}
      hasFeedback={hasFeedback}
      valuePropName={
        inputType === "checkbox"
          ? "checked"
          : inputType === "upload"
          ? "fileList"
          : "value"
      }
      getValueFromEvent={inputType === "upload" ? getValueFromEvent : undefined}
      style={style}
    >
      {inputType === "text" ? (
        <Input
          placeholder={placeholder}
          autoComplete="off"
          size={size}
          maxLength={maxLength}
          showCount={showCount}
          disabled={disabled}
        />
      ) : inputType === "textarea" ? (
        <Input.TextArea
          placeholder={placeholder}
          rows={rows}
          autoComplete="off"
          size={size}
          maxLength={maxLength}
          showCount={showCount}
          disabled={disabled}
        />
      ) : inputType === "select" ? (
        <Select
          placeholder={placeholder}
          options={options}
          autoComplete="off"
          size={size}
          disabled={disabled}
        />
      ) : inputType === "checkbox" ? (
        <Checkbox size={size} disabled={disabled} required={required} />
      ) : inputType === "upload" ? (
        <Upload {...props}>
          {children}
        </Upload>
      ) : inputType === "colorPicker" ? (
        <ColorPicker format="hex" showText disabledAlpha disabledFormat {...props} />
      ) : (
        children
      )}
    </Form.Item>
  );
}
