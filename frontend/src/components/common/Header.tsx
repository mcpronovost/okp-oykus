import React from "react";
import { useRouter } from "@/hooks/core/useRouter";

interface Props {
  title: string;
  description?: string;
  path?: string;
}

export default function OkpForumHeader({ title, description, path }: Props) {
  const { doRoute } = useRouter();

  return (
    <header className="okp-forum-header">
      <h2 className="okp-forum-header-title">
        {(path) ? (
          <a href={`${path}`} onClick={doRoute}>{title}</a>
        ) : (
          <span>{title}</span>
        )}
      </h2>
      {description && (
        <p className="okp-forum-header-description">{description}</p>
      )}
    </header>
  );
}