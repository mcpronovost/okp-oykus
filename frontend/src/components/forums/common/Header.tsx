import { useContext } from "react";
import { RouterContext } from "@/_libs/stores/RouterContext";

interface Props {
  title: string;
  description?: string | null;
  path?: string | null;
  singleton?: boolean;
}

export default function OkpForumHeader({ title, description, path, singleton }: Props) {
  const { doRoute } = useContext(RouterContext);

  return (
    <header className="okp-forum-header">
      <h2 className="okp-forum-header-title">
        {(path && !singleton) ? (
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