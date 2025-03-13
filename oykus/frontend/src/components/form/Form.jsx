import "@/assets/styles/form/form.scss";
import { Form } from "radix-ui";

export function OkpForm({ children, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <Form.Root className="okp-form" onSubmit={handleSubmit}>
      {children}
    </Form.Root>
  );
}
