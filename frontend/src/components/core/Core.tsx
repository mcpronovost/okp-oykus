import React from "react";
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
          {children}
        </main>
        <OkpCoreRight />
      </div>
    </OkpProviders>
  );
}
