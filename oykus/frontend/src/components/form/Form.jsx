import "@/assets/styles/form/form.scss";
import { Form } from "antd";

export default function OkpForm({
  children,
  form,
  submit,
  labelCol = 4,
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
      labelCol={{ span: labelCol }}
      className={`okp-form ${className}`}
      onFinish={handleOnFinish}
      initialValues={initialValues}
      {...props}
    >
      {children}
    </Form>
  );
}
