import "@/assets/styles/page/auth/login.scss";
import { useState } from "react";
import { Card, Form, Input, Button, Space, notification } from "antd";
import { User, Lock } from "lucide-react";
import { okpApi } from "@/services/api";
import { useAuth } from "@/services/auth";
import { useTranslation } from "@/services/translation";
import { OkpBanner, OkpLink } from "@/components/ui";

export default function OkpAuthLogin() {
  const [api, contextHolder] = notification.useNotification();
  const { setUser, setRat } = useAuth();
  const { t, lang } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      const result = await okpApi.login(values);
      if (result.token) {
        setRat(result.token);
        setUser(result.user);
        window.location.href = `/${lang}/`;
      } else {
        throw new Error();
      }
    } catch (e) {
      console.log(e);
      openNotification(t("Unable to log in with provided credentials."));
    } finally {
      setIsLoading(false);
    }
  };

  const openNotification = (msg) => {
    api.error({
      message: t("Login failed"),
      description: msg,
    });
  };

  return (
    <div className="okp-auth-login">
      {contextHolder}
      <Card cover={<OkpBanner src="https://placehold.co/400x200" size="200" blur={0} />}>
        <header className="okp-auth-login-header">
          <h1 className="okp-auth-login-header-title">{t("Login")}</h1>
        </header>
        <div className="okp-auth-login-content">
          <Form name="okp-auth-login" onFinish={handleSubmit} colon={false} labelCol={{ span: 7 }} validateMessages={{ required: t("This field is required!") }}>
            <Form.Item name="username" label={t("Username")} rules={[{ required: true }]} hasFeedback>
              <Input prefix={<User size={16} />} autoComplete="off" />
            </Form.Item>
            <Form.Item name="password" label={t("Password")} rules={[{ required: true }]} hasFeedback>
              <Input.Password prefix={<Lock size={16} />} autoComplete="off" />
            </Form.Item>
            <Form.Item className="okp-auth-login-actions">
              <Space>
                <OkpLink href="/">
                  <Button htmlType="button" disabled={isLoading}>
                    {t("Cancel")}
                  </Button>
                </OkpLink>
                <Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
                  {t("Login")}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
}
