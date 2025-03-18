import { useI18n } from "@/services/i18n";

export default function OkpLink({ children, href, colour, toLang, ...props }) {
  const { lang } = useI18n();

  const linkStyle = {
    color: colour ? colour : null,
  };

  toLang = toLang || lang;

  return (
    <a href={href === "#" ? href : `/${toLang}${href}`} {...props} style={linkStyle}>
      {children}
    </a>
  );
}
