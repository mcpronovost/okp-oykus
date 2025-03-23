import { useRouter } from "@/services/router";

export default function OkpLink({ children, href, colour, toLang, ...props }) {
  const { lang } = useRouter();

  const linkStyle = {
    color: colour ? colour : null,
  };

  toLang = toLang || lang;

  return (
    <a href={(!href || href === "#") ? href : `/${toLang}${href}`} {...props} style={linkStyle}>
      {children}
    </a>
  );
}
