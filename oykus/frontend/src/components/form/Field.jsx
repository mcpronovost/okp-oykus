import { Form, Input, Select  } from "antd";

export default function OkpField({ name, label, placeholder, inputType = "input", options = [], rows = 4, required = false, children, ...props }) {
  return (
    <Form.Item name={name} label={label} rules={[{ required: required }]} hasFeedback>
      {inputType === "text" ? (
        <Input placeholder={placeholder} autoComplete="off" />
      ) : inputType === "textarea" ? (
        <Input.TextArea placeholder={placeholder} rows={rows} autoComplete="off" />
      ) : inputType === "select" ? (
        <Select placeholder={placeholder} options={options} autoComplete="off" />
      ) : children}
    </Form.Item>
  );
}
