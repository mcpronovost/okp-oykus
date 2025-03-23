export default function OkpScrollarea({ children, enableHorizontal = false, enableVertical = true, id = "", className = "" }) {
  return (
    <div id={id} className={`okp-scrollarea ${className}`}>
      <div className="okp-scrollarea-viewport">
        {children}
      </div>
    </div>
  );
}
