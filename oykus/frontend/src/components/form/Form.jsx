import "@/assets/styles/form/form.scss";
import { Form } from "antd";

export default function OkpForm({
  children,
  form,
  submit,
  labelCol = 4,
  padding = 24,
  className = "",
  initialValues = {},
  ...props
}) {
  const handleOnFinish = (values) => {
    submit(values);
  };

  return (
    <Form
      form={form}
      colon={false}
      labelCol={typeof labelCol === "number" ? { span: labelCol } : labelCol}
      className={`okp-form ${className}`}
      onFinish={handleOnFinish}
      initialValues={initialValues}
      style={{ padding: `${padding}px` }}
      {...props}
    >
      {children}
    </Form>
  );
}
