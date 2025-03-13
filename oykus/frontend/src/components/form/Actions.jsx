import { Form } from "radix-ui";

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
      <button className="okp-form-actions-submit">
        {label}
      </button>
    </Form.Submit>
  );
}

export function OkpReset({ label, ...props }) {
  return (
    <button className="okp-form-actions-reset" type="reset" {...props}>{label}</button>
  );
}
