import { useMemo } from "react";
import { useRouter } from "@/services/router";

export default function OkpLink({ children, href, colour, toLang, ...props }) {
  const { r } = useRouter();
  
  const toRouteName = useMemo(() => r(href, toLang), [href, r, toLang]);
  const linkStyle = useMemo(() => ({
    color: colour || null,
  }), [colour]);

  return (
    <a href={toRouteName} {...props} style={linkStyle}>
      {children}
    </a>
  );
}
