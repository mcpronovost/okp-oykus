export default function CommonButton({ children, width, padding, margin }) {
  return (
    <button type="button" className="okp-button" style={
      {
        width: width,
        padding: padding,
        margin: margin
      }
    }>
      <span>{children}</span>
    </button>
  );
}
