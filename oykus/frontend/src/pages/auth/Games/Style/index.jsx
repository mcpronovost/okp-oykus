import { useTranslation } from "@/services/translation";
import { OkpAuthGamesLayout } from "@/components/layout";
import { OkpCard } from "@/components/ui";
import OkpAuthGamesPreview from "@/components/auth/games/Preview";

import { Form } from "antd";
import { OkpForm, OkpFormField } from "@/components/form";

export default function OkpAuthGamesStyle({ data }) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const initialValues = {
    primary: data?.game?.primary,
  }

  const primary = Form.useWatch("primary", form);
  const core_bg = Form.useWatch("core_bg", form);
  const core_fg = Form.useWatch("core_fg", form);
  const core_subtle_fg = Form.useWatch("core_subtle_fg", form);
  const core_header_bg = Form.useWatch("core_header_bg", form);
  const core_header_fg = Form.useWatch("core_header_fg", form);
  const core_elevated_fg = Form.useWatch("core_elevated_fg", form);
  const card_bg = Form.useWatch("card_bg", form);
  const card_placeholder_bg = Form.useWatch("card_placeholder_bg", form);
  const card_placeholder_fg = Form.useWatch("card_placeholder_fg", form);

  return (
    <OkpAuthGamesLayout data={data} defaultActiveKey={3} activeItem="style-general">
      <OkpCard padding={24}>
        <OkpAuthGamesPreview data={{
          primary: (primary && typeof primary === "string") ? primary : primary?.toHexString() || null,
          core_bg: core_bg?.toHexString() || null,
          core_fg: core_fg?.toHexString() || null,
          core_subtle_fg: core_subtle_fg?.toHexString() || null,
          core_header_bg: core_header_bg?.toHexString() || null,
          core_header_fg: core_header_fg?.toHexString() || null,
          core_elevated_fg: core_elevated_fg?.toHexString() || null,
          card_bg: card_bg?.toHexString() || null,
          card_placeholder_bg: card_placeholder_bg?.toHexString() || null,
          card_placeholder_fg: card_placeholder_fg?.toHexString() || null,
        }} />
        {JSON.stringify(primary)}
        <OkpForm form={form} initialValues={initialValues}>
          <OkpFormField label={t("Primary Colour")} name="primary" inputType="colorPicker" />
          <OkpFormField label={t("Background Colour")} name="core_bg" inputType="colorPicker" />
          <OkpFormField label={t("Text Colour")} name="core_fg" inputType="colorPicker" />
          <OkpFormField label={t("Subtle Text Colour")} name="core_subtle_fg" inputType="colorPicker" />
          <OkpFormField label={t("Header Background Colour")} name="core_header_bg" inputType="colorPicker" />
          <OkpFormField label={t("Header Text Colour")} name="core_header_fg" inputType="colorPicker" />
          <OkpFormField label={t("Elevated Text Colour")} name="core_elevated_fg" inputType="colorPicker" />
          <OkpFormField label={t("Card Background Colour")} name="card_bg" inputType="colorPicker" />
          <OkpFormField label={t("Card Placeholder Background Colour")} name="card_placeholder_bg" inputType="colorPicker" />
          <OkpFormField label={t("Card Placeholder Text Colour")} name="card_placeholder_fg" inputType="colorPicker" />
        </OkpForm>
      </OkpCard>
    </OkpAuthGamesLayout>
  );
}
