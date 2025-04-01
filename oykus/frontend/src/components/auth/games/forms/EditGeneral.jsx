import { useEffect, useMemo, useState } from "react";
import { Row, Col, Form, notification } from "antd";
import { okpApi } from "@/services/api";
import { useTranslation } from "@/services/translation";
import {
  OkpForm,
  OkpFormField,
  OkpFormActions,
  OkpFormSubmit,
  OkpFormReset,
} from "@/components/form";
import { OkpAvatar, OkpBanner, OkpButton, OkpCard } from "@/components/ui";

export default function OkpAuthGamesEditGeneral({
  game,
  onReset = () => {},
}) {
  const [api, contextHolder] = notification.useNotification();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();

  const titleValue = Form.useWatch("title", form);
  const subtitleValue = Form.useWatch("subtitle", form);
  const logoValue = Form.useWatch("logo", form);
  const coverValue = Form.useWatch("cover", form);
  const [logoPreview, setLogoPreview] = useState(game.logo);
  const [coverPreview, setCoverPreview] = useState(game.cover);

  const initialValues = useMemo(
    () => ({
      title: game.title,
      slug: game.slug,
      subtitle: game.subtitle,
      is_public: game.is_public,
      logo: game.logo ? [{ uid: "original", url: game.logo }] : [],
      cover: game.cover ? [{ uid: "original", url: game.cover }] : [],
    }),
    [game]
  );

  const handleLogoUpload = (file) => {
    const previewUrl = URL.createObjectURL(file);
    setLogoPreview(previewUrl);
    return false;
  }

  const handleCoverUpload = (file) => {
    const previewUrl = URL.createObjectURL(file);
    setCoverPreview(previewUrl);
    return false;
  }

  const handleSubmit = async (e) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", e.title);
    formData.append("slug", e.slug);
    formData.append("subtitle", e.subtitle);
    formData.append("is_public", e.is_public);

    // Handle logo file
    const logoFile = e.logo[0]?.originFileObj;
    if (logoFile) {
      formData.append("logo", logoFile);
    }

    // Handle cover file
    const coverFile = e.cover[0]?.originFileObj;
    if (coverFile) {
      formData.append("cover", coverFile);
    }

    try {
      const result = await okpApi.updateGame(game.id, formData);
      if (result?.success) {
        openNotification(t("Game updated"), t("Game updated successfully"), "success");
      } else {
        throw new Error(result?.message);
      }
    } catch (e) {
      openNotification(t("Failed to edit game"), `${t("An error occurred while editing the game")}: "${e.message}"`, "error");
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

  useEffect(() => {
    if (logoValue?.[0] && logoValue[0].uid === "original" && logoValue[0].url !== logoPreview) {
      setLogoPreview(logoValue[0].url);
    }
  }, [logoValue]);

  useEffect(() => {
    if (coverValue?.[0] && coverValue[0].uid === "original" && coverValue[0].url !== coverPreview) {
      setCoverPreview(coverValue[0].url);
    }
  }, [coverValue]);

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
          <Col span={24} xl={17}>
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
                <OkpAvatar
                  src={logoPreview}
                  alt={game.title}
                  fallback={game.abbr}
                  size={48}
                  stroke={4}
                  colour={game.logo ? undefined : game.primary}
                  top={96}
                  className="okp-auth-games-edit-banner-logo"
                />
                <div className="okp-auth-games-edit-banner-title">
                  {titleValue}
                </div>
                {subtitleValue && (
                  <div className="okp-auth-games-edit-banner-subtitle">
                    {subtitleValue}
                  </div>
                )}
              </OkpCard>
            </section>
          </Col>
          <Col span={24} xl={7}>
            <Row gutter={[16, 16]} style={{ height: "100%" }}>
              <Col span={24} sm={12} xl={24}>
                <section className="okp-auth-games-edit-banner">
                  <OkpCard style={{ height: "100%" }}>
                    <OkpFormField
                      name="cover"
                      inputType="upload"
                      maxCount={1}
                      showUploadList={false}
                      beforeUpload={handleCoverUpload}
                      style={{ margin: 0 }}
                    >
                      <OkpButton variant="link" color="default" className="okp-auth-games-edit-banner-cover-upload">
                        <span className="okp-auth-games-edit-banner-cover-upload-title">{t("Edit cover image")}</span>
                        <small className="okp-auth-games-edit-banner-cover-upload-description">{t("Recommended size: 1200x250")}</small>
                      </OkpButton>
                    </OkpFormField>
                  </OkpCard>
                </section>
              </Col>
              <Col span={24} sm={12} xl={24}>
                <section className="okp-auth-games-edit-banner">
                  <OkpCard style={{ height: "100%" }}>
                    <OkpFormField
                      name="logo"
                      inputType="upload"
                      maxCount={1}
                      showUploadList={false}
                      beforeUpload={handleLogoUpload}
                      style={{ margin: 0 }}
                    >
                      <OkpButton variant="link" color="default" className="okp-auth-games-edit-banner-cover-upload">
                        <span className="okp-auth-games-edit-banner-cover-upload-title">{t("Edit logo")}</span>
                        <small className="okp-auth-games-edit-banner-cover-upload-description">{t("Recommended size: 200x200")}</small>
                      </OkpButton>
                    </OkpFormField>
                  </OkpCard>
                </section>
              </Col>
            </Row>
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
