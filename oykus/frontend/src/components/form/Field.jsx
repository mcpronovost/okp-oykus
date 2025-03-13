import { Form } from "radix-ui";

export function OkpField({ name, label, errors, children }) {
  return (
    <Form.Field className="okp-form-field" name={name}>
      <div className="okp-form-label-and-message">
        <Form.Label className="okp-form-label">{label}</Form.Label>
        {errors?.length > 0 && errors.map((error) => (
          <Form.Message key={error.match} className="okp-form-message" match={error.match}>
            {error.message}
          </Form.Message>
        ))}
      </div>
      <Form.Control asChild>
        {children}
      </Form.Control>
    </Form.Field>
  );
}
