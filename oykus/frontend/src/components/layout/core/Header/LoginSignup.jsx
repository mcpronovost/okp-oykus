import { useMemo } from "react";
import { Menu } from "antd";
import { LogIn, Power } from "lucide-react";
import { useTranslation } from "@/services/translation";
import { OkpLink } from "@/components/ui";

export default function OkpHeaderLoginSignup() {
  const { t } = useTranslation();

  const items = useMemo(() => [
    {
      key: "1",
      label: (
        <OkpLink href="/">
          {t("Login")}
        </OkpLink>
      ),
      icon: <Power size={14} />,
    },
    {
      key: "2",
      label: (
        <OkpLink href="/">
          {t("SignUp")}
        </OkpLink>
      ),
      icon: <LogIn size={14} />,
    },
  ], [t]);

  return (
    <div id="okp-core-header-loginsignup">
      <Menu mode="horizontal" items={items} style={{ borderBottom: "none" }} />
    </div>
  );
}
