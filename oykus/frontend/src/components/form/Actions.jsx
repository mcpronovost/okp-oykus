import { Form } from "radix-ui";
import { OkpButton } from "@/components/ui";

export function OkpActions({ children, ...props }) {
  return (
    <div className="okp-form-actions" {...props}>
      {children}
    </div>
  );
}

export function OkpSubmit({ label, ...props }) {
  return (
    <Form.Submit {...props} asChild>
      <OkpButton type="submit" colour="primary" {...props}>{label}</OkpButton>
    </Form.Submit>
  );
}

export function OkpReset({ label, ...props }) {
  return (
    <OkpButton type="reset" variant="outline" {...props}>{label}</OkpButton>
  );
}
