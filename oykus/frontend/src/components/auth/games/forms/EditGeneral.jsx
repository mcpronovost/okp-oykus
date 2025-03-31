import { useMemo, useState } from "react";
import { Row, Col, Form, notification } from "antd";
import { Image } from "lucide-react";
import { okpApi } from "@/services/api";
import { useTranslation } from "@/services/translation";
import {
  OkpForm,
  OkpFormField,
  OkpFormActions,
  OkpFormSubmit,
  OkpFormReset,
} from "@/components/form";
import { OkpBanner, OkpButton, OkpCard } from "@/components/ui";

export default function OkpAuthGamesEditGeneral({
  game,
  afterSubmit = () => {},
  onReset = () => {},
}) {
  const [api, contextHolder] = notification.useNotification();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();

  const titleValue = Form.useWatch("title", form);
  const subtitleValue = Form.useWatch("subtitle", form);
  const [coverPreview, setCoverPreview] = useState(game.cover);

  const initialValues = useMemo(
    () => ({
      title: game.title,
      slug: game.slug,
      subtitle: game.subtitle,
      is_public: game.is_public,
    }),
    [game]
  );

  const handleSubmit = async (e) => {
    setIsSubmitting(true);

    console.log(e);

    try {
      const result = await okpApi.updateGame(game.id, e);
      if (result?.success) {
        afterSubmit(result.message);
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      openNotification(t("An error occurred while editing the game"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const openNotification = (msg) => {
    api.error({
      message: t("Failed to edit game"),
      description: msg?.message || String(msg),
    });
  };

  return (
    <>
      {contextHolder}
      <OkpForm
        form={form}
        submit={handleSubmit}
        initialValues={initialValues}
        labelCol={3}
        padding={0}
      >
        <Row gutter={[16, 16]}>
          <Col span={24} sm={17}>
            <section className="okp-auth-games-edit-banner">
              <OkpCard
                cover={
                  <OkpBanner
                    src={coverPreview}
                    alt={game.title}
                    blur={0}
                    className="okp-auth-games-edit-banner-cover"
                  />
                }
              >
                <div className="okp-auth-games-edit-banner-title">
                  {titleValue}
                </div>
                <div className="okp-auth-games-edit-banner-subtitle">
                  {subtitleValue}
                </div>
              </OkpCard>
            </section>
          </Col>
          <Col span={24} sm={7}>
            <section className="okp-auth-games-edit-banner">
              <OkpCard style={{ height: "100%" }}>
                <OkpFormField
                  name="cover"
                  inputType="upload"
                  maxLength={1}
                  showUploadList={false}
                  beforeUpload={(file) => {
                    const previewUrl = URL.createObjectURL(file);
                    setCoverPreview(previewUrl);
                    return false;
                  }}
                  style={{ margin: 0 }}
                >
                  <OkpButton variant="link" color="default" className="okp-auth-games-edit-banner-cover-upload">
                    <Image size={24} className="okp-auth-games-edit-banner-cover-upload-icon" />
                    <span className="okp-auth-games-edit-banner-cover-upload-title">{t("Edit cover image")}</span>
                    <small className="okp-auth-games-edit-banner-cover-upload-description">{t("Recommended size: 1200x250")}</small>
                  </OkpButton>
                </OkpFormField>
              </OkpCard>
            </section>
          </Col>
          <Col span={24}>
            <section className="okp-auth-games-edit-general">
              <OkpCard padding={24}>
                <h2 className="okp-auth-games-edit-general-title">
                  {t("General Information")}
                </h2>
                <OkpFormField
                  label={t("Title")}
                  name="title"
                  inputType="text"
                  placeholder={t("Enter your title")}
                  maxLength={120}
                  showCount
                  required
                />
                <OkpFormField
                  label={t("Slug")}
                  name="slug"
                  inputType="text"
                  disabled
                />
                <OkpFormField
                  label={t("Subtitle")}
                  name="subtitle"
                  inputType="text"
                  placeholder={t("Enter your subtitle")}
                  maxLength={200}
                  showCount
                  required
                />
                <OkpFormField
                  label={t("Public")}
                  name="is_public"
                  inputType="checkbox"
                />
                <OkpFormActions>
                  <OkpFormReset
                    label={t("Reset")}
                    disabled={isSubmitting}
                    onClick={onReset}
                  />
                  <OkpFormSubmit label={t("Save")} isLoading={isSubmitting} />
                </OkpFormActions>
              </OkpCard>
            </section>
          </Col>
        </Row>
      </OkpForm>
    </>
  );
}
