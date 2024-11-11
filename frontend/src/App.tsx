import { useContext, useState, useEffect } from "react";
// import { WebContext } from "@/_libs/stores/WebContext";
import { authApi } from "@/_libs/utils/api";
import OkpCoreHead from "@/components/core/Head";
import OkpCoreLeft from "@/components/core/Left";
import OkpCoreRight from "@/components/core/Right";

export default function App () {
  // const { lang, setLang } = useContext(WebContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    authApi.getUser().then((user) => {
      console.log(user);
    });
  }, []);

  return (
    <>
      <OkpCoreHead />
      <div id="okp-core-body">
        <OkpCoreLeft />
        <main id="okp-core-main">
          content
        </main>
        <OkpCoreRight />
      </div>
    </>
  )
}
