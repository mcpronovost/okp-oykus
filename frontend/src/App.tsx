import { useContext, useEffect } from "react";
import { AuthContext } from "@/_libs/stores/AuthContext";
import OkpCoreHead from "@/components/core/Head";
import OkpCoreLeft from "@/components/core/Left";
import OkpCoreRight from "@/components/core/Right";

export default function App({ children }: { children: React.ReactNode }) {
  const { doUpdateUser } = useContext(AuthContext);

  useEffect(() => {
    doUpdateUser();
  }, []);

  return (
    <>
      <OkpCoreHead />
      <div id="okp-core-body">
        <OkpCoreLeft />
        <main id="okp-core-main">
          {children}
        </main>
        <OkpCoreRight />
      </div>
    </>
  )
}
