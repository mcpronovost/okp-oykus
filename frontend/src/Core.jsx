import { Outlet } from "react-router-dom";
import OkpCoreHeader from "@/components/core/Header";
import OkpCoreNavbar from "@/components/core/Navbar";
import OkpCoreSidebar from "@/components/core/Sidebar";

export default function CoreView() {
  const user = true;

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
