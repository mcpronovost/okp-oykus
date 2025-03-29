import { useMemo, useState } from "react";
import { Form, notification } from "antd";
import { okpApi } from "@/services/api";
import { useAuth } from "@/services/auth";
import { useTranslation } from "@/services/translation";
import {
  OkpForm,
  OkpFormField,
  OkpFormActions,
  OkpFormSubmit,
  OkpFormReset,
} from "@/components/form";

export default function OkpGameForumFormNewTopic({
  gameId,
  sectionId,
  onCancel,
}) {
  const [api, contextHolder] = notification.useNotification();
  const { user } = useAuth();
  const { t, lang } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();

  const characters = useMemo(() => {
    if (!user) return [];
    return user?.characters
      ?.filter((c) => c.game == gameId)
      .map((c) => ({
        value: c.id,
        label: c.name,
      }));
  }, [user, gameId]);

  const handleSubmit = async (e) => {
    setIsSubmitting(true);

    try {
      const result = await okpApi.createTopic({
        ...e,
        section: sectionId,
      });
      if (result?.success) {
        window.location.href = `/${lang}/${result.url}?page=last`;
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      openNotification(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  const openNotification = (msg) => {
    api.error({
      message: t("Failed to create topic"),
      description: msg?.message || String(msg),
    });
  };

  return (
    <>
      {contextHolder}
      <OkpForm
        form={form}
        submit={handleSubmit}
        initialValues={{ character: characters[0]?.value }}
      >
        <OkpFormField
          name="title"
          label={t("Title")}
          inputType="text"
          placeholder={t("Enter your title")}
          required
        />
        <OkpFormField
          name="character"
          label={t("Character")}
          inputType="select"
          placeholder={t("Select a character")}
          options={characters}
          required
        />
        <OkpFormField
          name="message"
          label={t("Message")}
          inputType="textarea"
          placeholder={t("Enter your message")}
          rows={8}
          required
        />
        <OkpFormActions>
          <OkpFormReset
            label={t("Cancel")}
            disabled={isSubmitting}
            onClick={handleCancel}
          />
          <OkpFormSubmit label={t("Send")} isLoading={isSubmitting} />
        </OkpFormActions>
      </OkpForm>
    </>
  );
}
