import type { Category } from "@/_libs/types/forums.types";
import OkpNotFound from "@/components/common/NotFound";
import OkpForumHeader from "@/components/forums/common/Header";
import OkpSectionList from "@/components/forums/SectionList";

interface Props {
  data?: Category;
  singleton?: boolean;
}

export default function OkpForumCategory ({ data, singleton }: Props) {
  return (
    <article className="okp-forum-category">
      {(data) ? (
        <>
          <OkpForumHeader
            title={data.name}
            description={data.description || undefined}
            path={singleton ? undefined : data.path}
            singleton={singleton}
          />
          <OkpSectionList sections={data.sections} />
        </>
      ) : <OkpNotFound />}
    </article>
  );
}
