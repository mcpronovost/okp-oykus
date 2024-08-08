import { useContext } from "react";
import { Outlet } from "react-router-dom";
import StoreContext from "@/_lib/store";
import OkpCoreHeader from "@/components/core/Header";
import OkpCoreNavbar from "@/components/core/Navbar";
import OkpCoreSidebar from "@/components/core/Sidebar";

export default function CoreView() {
  const { user } = useContext(StoreContext);

  return (
    <>
      <OkpCoreHeader />
      <div id="okp-core-body">
        {!!user && <OkpCoreNavbar />}
        <main id="okp-core-main">
          <Outlet />
        </main>
        {!!user && <OkpCoreSidebar />}
      </div>
    </>
  );
}
