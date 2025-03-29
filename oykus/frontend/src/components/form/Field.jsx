import { Form, Input, Select  } from "antd";

export default function OkpField({ name, label, placeholder, inputType = "input", options = [], rows = 4, size = "default", required = false, hasFeedback = true, children, ...props }) {
  return (
    <Form.Item name={name} label={label} rules={[{ required: required }]} hasFeedback={hasFeedback}>
      {inputType === "text" ? (
        <Input placeholder={placeholder} autoComplete="off" size={size} />
      ) : inputType === "textarea" ? (
        <Input.TextArea placeholder={placeholder} rows={rows} autoComplete="off" size={size} />
      ) : inputType === "select" ? (
        <Select placeholder={placeholder} options={options} autoComplete="off" size={size} />
      ) : children}
    </Form.Item>
  );
}
