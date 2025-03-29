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

export default function OkpForumNewPost({ gameId, topicId, afterSubmit = () => {} }) {
  const [api, contextHolder] = notification.useNotification();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();

  const characters = useMemo(() => {
    if (!user) return [];
    return user?.characters?.filter((c) => c.game == gameId).map((c) => ({
      value: c.id,
      label: c.name,
    }));
  }, [user, gameId]);

  const handleSubmit = async (e) => {
    setIsSubmitting(true);

    try {
      const result = await okpApi.createPost({
        ...e,
        topic: topicId,
      });
      if (result?.success) {
        afterSubmit();
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      if (error.message.includes("topic")) {
        openNotification(t("You are not allowed to create a post in this topic"));
      } else {
        openNotification(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const openNotification = (msg) => {
    api.error({
      message: t("Failed to create post"),
      description: msg?.message || String(msg),
    });
  };

  return (
    <>
      {contextHolder}
      <OkpForm form={form} submit={handleSubmit} initialValues={{ character: characters[0]?.value }}>
        <OkpFormField
          name="character"
          label="Character"
          inputType="select"
          placeholder="Select a character"
          options={characters}
          required
        />
        <OkpFormField
          name="message"
          label="Message"
          inputType="textarea"
          placeholder="Enter your message"
          rows={8}
          required
        />
        <OkpFormActions>
          <OkpFormReset label="Reset" disabled={isSubmitting} />
          <OkpFormSubmit label="Send" isLoading={isSubmitting} />
        </OkpFormActions>
      </OkpForm>
    </>
  );
}
