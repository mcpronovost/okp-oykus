import React from "react";
import { Construction, AlertCircle } from "lucide-react";

export default function OkpNotFound(): JSX.Element {
  return (
    <div className="okp-not-found">
      <div className="okp-card okp-not-found-content">
        <div className="okp-not-found-icons">
          <Construction className="okp-icon okp-icon-primary" size={48} />
          <AlertCircle className="okp-icon okp-icon-secondary" size={32} />
        </div>
        <h1>Page Not Found</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>
      </div>
    </div>
  );
}