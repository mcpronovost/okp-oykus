import classNames from "classnames";
import { LoadingProps } from "@/types";

export default function OkpLoading({
  variant = "circles",
  py = 0,
}: LoadingProps) {
  return (
    <div className={"okp-loading"} style={{ padding: `${py}px` }}>
      <div
        className={classNames("okp-loading-spinner", `okp-${variant}`)}
      ></div>
    </div>
  );
}
