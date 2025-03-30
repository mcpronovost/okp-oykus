import { useMemo } from "react";
import { useRouter } from "@/services/router";

export default function OkpLink({ children, href, colour, toLang, disabled = false, ...props }) {
  const { r } = useRouter();

  const toRouteName = href.startsWith("http") ? href : useMemo(() => r(href, toLang), [href, r, toLang]);
  const linkStyle = useMemo(() => ({
    color: colour || null,
  }), [colour]);

  return (
    <a href={disabled ? null : toRouteName} {...props} disabled={disabled} style={linkStyle} {...(disabled && { tabIndex: -1, onClick: (e) => e.preventDefault() })}>
      {children}
    </a>
  );
}
