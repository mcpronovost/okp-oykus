import "@/assets/styles/form/form.scss";
import { Form } from "radix-ui";

export function OkpForm({ children, submit, className = "" }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    submit(e);
  };

  return (
    <form className={`okp-form ${className}`} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
