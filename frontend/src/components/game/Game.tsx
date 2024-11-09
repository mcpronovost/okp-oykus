import React, { useEffect, useState } from "react";
import { useRouter } from "@/hooks/core/useRouter";
import OkpLoading from "@/components/ui/Loading";
import OkpNotFound from "@/components/common/NotFound";
import OkpForumIndex from "@/components/forum/Index";
import OkpForumCategory from "@/components/forum/Category";

export default function OkpGame () {
  const { route, doSetRoute, doCleanRouter } = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<React.ReactNode>(<OkpNotFound />);

  const doSetView = (path: string | null) => {
    setIsLoading(true);
    doCleanRouter();
    path = path || "";
    try {
      switch (true) {
        case /^c\d+-[\w-]+\/s\d+-[\w-]+\/t\d+-[\w-]+/.test(path):
          setView(<div>Topic View</div>);
          break;
        case /^c\d+-[\w-]+\/s\d+-[\w-]+/.test(path):
          setView(<div>Section View</div>);
          break;
        case /^c\d+-[\w-]+/.test(path):
          setView(<OkpForumCategory />);
          break;
        case path === "forum":
          setView(<OkpForumIndex />);
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

  return view;
}
