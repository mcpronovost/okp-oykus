import { ReactNode } from "react";

export type okpRoute = {
  uri: string;
  view: ReactNode;
  meta: okpMeta;
  hidelayout?: boolean | undefined
};

export type okpMeta = {
  title: string;
  description?: string | undefined;
};
