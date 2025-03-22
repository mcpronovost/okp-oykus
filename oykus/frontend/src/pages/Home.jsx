import { useEffect } from "react";
import { Button } from "antd";
import { useAuthApi } from "@/services/api";
import { OkpLayout } from "@/components/layout";

export default function Home() {
  const { login, getCurrentUser } = useAuthApi();

  useEffect(() => {
    const { data } = getCurrentUser();
    const user = data?.user;
    console.log(user);
  }, []);

  return (
    <OkpLayout>
      <section>
        <h1>Home</h1>
        <p>Welcome to the home page</p>
        <a href="/g/oykus/">Go to Oykus</a>
        <Button type="primary">Primary Button</Button>
        <button onClick={() => login({ username: "mc", password: "1" })}>
          Login me
        </button>
      </section>
    </OkpLayout>
  );
}
