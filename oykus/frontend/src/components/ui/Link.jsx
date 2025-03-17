import { useI18n } from "@/services/i18n";

export default function OkpLink({ children, href, toLang, ...props }) {
  const { lang } = useI18n();

  toLang = toLang || lang;

  return (
    <a href={href === "#" ? href : `/${toLang}${href}`} {...props}>
      {children}
    </a>
  );
}
