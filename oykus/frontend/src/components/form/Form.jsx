import "@/assets/styles/form/form.scss";
import { Form } from "radix-ui";

export function OkpForm({ children, className, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <Form.Root className={`okp-form ${className}`} onSubmit={handleSubmit}>
      {children}
    </Form.Root>
  );
}
