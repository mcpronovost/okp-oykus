import OkpHeader from "@/components/layout/Header";
import OkpLeftPanel from "@/components/layout/LeftPanel";
import OkpRightPanel from "@/components/layout/RightPanel";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div id="okp">
      <OkpHeader />
      <main id="okp-layout-main">
        <OkpLeftPanel />
        <div id="okp-layout-content" role="main">
          {children}
        </div>
        <OkpRightPanel />
      </main>
    </div>
  );
}
