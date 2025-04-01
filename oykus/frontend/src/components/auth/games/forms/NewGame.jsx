import { useState } from "react";
import { Form, notification } from "antd";
import { okpApi } from "@/services/api";
import { useRouter } from "@/services/router";
import { useTranslation } from "@/services/translation";
import {
  OkpForm,
  OkpFormField,
  OkpFormActions,
  OkpFormSubmit,
  OkpFormReset,
} from "@/components/form";
import { OkpCard, OkpHeading } from "@/components/ui";

const DEFAULT_FORM_VALUES = {
  title: "",
  subtitle: "",
  is_public: false,
  logo: [],
  cover: [],
};

export default function OkpAuthGamesNewGame({
  onCancel = () => {},
}) {
  const [api, contextHolder] = notification.useNotification();
  const { r } = useRouter();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();

  /**
   * Handle form submission for creating a new game
   */
  const handleSubmit = async (e) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", e.title);
    formData.append("subtitle", e.subtitle);

    try {
      const result = await okpApi.createGame(formData);
      if (result?.success && result?.id) {
        form.resetFields();
        openNotification(t("Game created"), t("Game created successfully"), "success");
        window.location.href = r(`a/games/${result?.id}/edit`);
      } else {
        throw new Error(result?.message);
      }
    } catch (e) {
      openNotification(t("Failed to create game"), `${t("An error occurred while creating the game")}: "${e.message}"`, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openNotification = (title, msg, type = "error") => {
    api.open({
      type,
      message: title,
      description: msg?.message || String(msg),
    });
  };

  return (
    <section className="okp-auth-games-create">
      {contextHolder}
      <OkpHeading title={t("Create Game")} tag="h1" />
      <OkpCard>
        <OkpForm
          form={form}
          submit={handleSubmit}
          initialValues={DEFAULT_FORM_VALUES}
          labelCol={3}
        >
          <OkpFormField
            name="title"
            label={t("Title")}
            inputType="text"
            placeholder={t("Enter your title")}
            maxLength={120}
            showCount
            required
          />
          <OkpFormField
            name="subtitle"
            label={t("Subtitle")}
            inputType="text"
            placeholder={t("Enter your subtitle")}
            maxLength={200}
            showCount
          />
          <OkpFormActions>
            <OkpFormReset
              label={t("Cancel")}
              disabled={isSubmitting}
              onClick={onCancel}
            />
            <OkpFormSubmit label={t("Save")} isLoading={isSubmitting} />
          </OkpFormActions>
        </OkpForm>
      </OkpCard>
    </section>
  );
}