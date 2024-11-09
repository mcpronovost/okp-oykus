import React, { useEffect, useState } from "react";
import { useRouter } from "@/hooks/core/useRouter";
import OkpProviders from "@/components/common/Providers";
import OkpLoading from "@/components/ui/Loading";
import OkpNotFound from "@/components/common/NotFound";
import OkpForumIndex from "@/components/forum/Index";
import OkpForumCategory from "@/components/forum/Category";
import OkpForumSection from "@/components/forum/Section";
import OkpForumTopic from "@/components/forum/Topic";

interface Props {
  slug: string;
}

export default function OkpGame ({ slug }: Props) {
  const { route, doSetRoute, doCleanRouter } = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<React.ReactNode>(<OkpNotFound />);

  const doSetView = (path: string | null) => {
    setIsLoading(true);
    doCleanRouter();
    path = path || "";
    let cpk: string | undefined;
    let spk: string | undefined;
    let tpk: string | undefined;
    try {
      switch (true) {
        case /^c\d+-[\w-]+\/s\d+-[\w-]+\/t\d+-[\w-]+/.test(path):
          tpk = path.match(/\/t(\d+)-/)?.[1];
          if (!tpk) break;
          setView(<OkpForumTopic slug={slug} tpk={tpk} />);
          break;
        case /^c\d+-[\w-]+\/s\d+-[\w-]+/.test(path):
          spk = path.match(/\/s(\d+)/)?.[1];
          if (!spk) break;
          setView(<OkpForumSection slug={slug} spk={spk} />);
          break;
        case /^c\d+-[\w-]+/.test(path):
          cpk = path.match(/^c(\d+)-/)?.[1];
          if (!cpk) break;
          setView(<OkpForumCategory slug={slug} cpk={cpk} />);
          break;
        case path === "forum":
          setView(<OkpForumIndex slug={slug} />);
          break;
        default:
          setView(<OkpNotFound />);
          break;
      }
    } catch {
      setView(<OkpNotFound />);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (route) {
      doSetView(route);
    }
  }, [route]);

  useEffect(() => {
    const uri = window.location.pathname.split(/\/g\/[\w-]+\//)[1] || "forum";
    doSetView(uri);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      doSetRoute(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (isLoading) return <OkpLoading />;

  return (
    <OkpProviders>
      {view}
    </OkpProviders>
  );
}
