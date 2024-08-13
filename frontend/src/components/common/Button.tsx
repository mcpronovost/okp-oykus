import OkpLoading from "@/components/common/Loading";

export default function OkpButton({
  children,
  onClick,
  start,
  end,
  colour,
  disabled,
  loading,
  outline,
  block
}) {
  if (!colour) colour = "default";
  if (disabled && colour != "default") colour = "default";

  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
      className={
        `okp-button
        okp-${colour}
        ${!!outline ? `okp-${colour}-outline` : ""}
        ${!!loading ? `okp-isloading` : ""}`
      }
      style={{
        width: block ? "100%" : "auto"
      }}
    >
      {!!loading && (
        <div className="okp-btn-loading">
          <OkpLoading size={"1rem"} colour={colour != "default" ? colour : null} />
        </div>
      )}
      <div className="okp-btn">
        {!!start && <span className="okp-btn-start">{start}</span>}
        <span className="okp-btn-mid">{children}</span>
        {!!end && <span className="okp-btn-end">{end}</span>}
      </div>
    </button>
  );
}
