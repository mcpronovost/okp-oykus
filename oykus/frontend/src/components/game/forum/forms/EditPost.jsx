import { useMemo, useState } from "react";
import { Form, notification } from "antd";
import { okpApi } from "@/services/api";
import { useTranslation } from "@/services/translation";
import {
  OkpForm,
  OkpFormField,
  OkpFormActions,
  OkpFormSubmit,
  OkpFormReset,
} from "@/components/form";

export default function OkpForumEditPost({ post, message, afterSubmit = () => {}, onCancel = () => {} }) {
  const [api, contextHolder] = notification.useNotification();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();

  const initialValues = useMemo(() => ({ message }), [message]);

  const handleSubmit = async (e) => {
    setIsSubmitting(true);

    try {
      const result = await okpApi.updatePost(post.id, e);
      if (result?.success) {
        afterSubmit(result.message);
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      openNotification(t("An error occurred while editing the post"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const openNotification = (msg) => {
    api.error({
      message: t("Failed to edit post"),
      description: msg?.message || String(msg),
    });
  };

  return (
    <>
      {contextHolder}
      <OkpForm form={form} submit={handleSubmit} initialValues={initialValues}>
        <OkpFormField
          name="message"
          inputType="textarea"
          placeholder={t("Enter your message")}
          rows={12}
          size="large"
          hasFeedback={false}
          required
        />
        <OkpFormActions>
          <OkpFormReset label={t("Cancel")} disabled={isSubmitting} onClick={onCancel} />
          <OkpFormSubmit label={t("Save")} isLoading={isSubmitting} />
        </OkpFormActions>
      </OkpForm>
    </>
  );
}
