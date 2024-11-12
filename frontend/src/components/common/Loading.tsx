import React from "react";

export default function OkpLoading ({ spinner = "circles" }: { spinner?: string }) {
  return (
    <div className="okp-loading">
      <div className={`okp-loading-spinner okp-${spinner}`}></div>
    </div>
  );
}
