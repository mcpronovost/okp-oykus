import { Button } from "antd";

export function OkpFormActions({ children }) {
  return <div className="okp-form-actions">{children}</div>;
}

export function OkpFormSubmit({ label, isLoading, children }) {
  return (
    <Button htmlType="submit" type="primary" loading={isLoading} disabled={isLoading}>
      {label || children}
    </Button>
  );
}

export function OkpFormReset({ label, isLoading, onClick, children }) {
  return (
    <Button htmlType="reset" disabled={isLoading} onClick={onClick}>
      {label || children}
    </Button>
  );
}
