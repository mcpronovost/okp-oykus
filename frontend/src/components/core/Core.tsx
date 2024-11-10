import React from "react";
import SimpleBarReact from "simplebar-react";
import OkpProviders from "@/components/common/Providers";
import OkpCoreHead from "@/components/core/CoreHead";
import OkpCoreLeft from "@/components/core/CoreLeft";
import OkpCoreRight from "@/components/core/CoreRight";

interface Props {
  children: React.ReactNode;
  slug?: string;
}

export default function OkpCore ({ children, slug }: Props) {
  return (
    <OkpProviders>
      <OkpCoreHead />
      <div id="okp-core-body">
        <OkpCoreLeft slug={slug} />
        <main id="okp-core-main">
          <SimpleBarReact style={{ height: "calc(100vh - 48px)" }}>
            {children}
          </SimpleBarReact>
        </main>
        <OkpCoreRight />
      </div>
    </OkpProviders>
  );
}
