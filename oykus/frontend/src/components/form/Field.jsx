import { Form } from "radix-ui";
import { OkpSelect } from "@/components/form";

export function OkpField({ name, label, input, value, onChange, errors, required = false, children, ...props }) {
  return (
    <div className="okp-form-field" name={name}>
      <div className="okp-form-label-and-message">
        <label htmlFor={name} className="okp-form-label">{label}</label>
        {errors?.length > 0 && (
          <div className="okp-form-errors">
            {errors.map((error, index) => (
              <p key={index} className="okp-form-errors-message">
                {error}
              </p>
            ))}
          </div>
        )}
      </div>
      <div>
        {input === "textarea" ? (
          <textarea name={name} required={required} value={value} onChange={onChange} className="okp-form-textarea" {...props} />
        ) : input === "select" ? (
          <OkpSelect name={name} required={required} value={value} onChange={onChange} className="okp-form-select" {...props} />
        ) : (
          children
        )}
      </div>
    </div>
  );
}
