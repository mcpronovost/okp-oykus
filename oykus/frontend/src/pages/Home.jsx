import { useEffect } from "react";
import { useAuthApi } from "@/services/api";

export default function Home() {
  const { login, getCurrentUser } = useAuthApi();

  useEffect(() => {
    const { data } = getCurrentUser();
    const user = data?.user;
    console.log(user);
  }, []);

  return (
    <section>
      <h1>Home</h1>
      <p>Welcome to the home page</p>
      <a href="/g/oykus/">Go to Oykus</a>
      <button onClick={() => login({ username: "mc", password: "1" })}>
        Login me
      </button>
    </section>
  );
}
