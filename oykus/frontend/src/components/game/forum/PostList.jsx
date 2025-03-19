import "@/assets/styles/forum/postList.scss";
import { useMemo } from "react";
import { OkpGameForumPostCard } from "@/components/game";

export default function OkpGameForumPostList({ posts, className = "" }) {
  const postListMemo = useMemo(() => {
    if (!posts) return null;

    return posts.map((post, index) => (
      <OkpGameForumPostCard key={post.id} post={post} isLast={index === posts.length - 1} />
    ));
  }, [posts]);

  if (!posts) return null;

  return (
    <section className={`okp-forum-post-list ${className}`}>
      {postListMemo}
    </section>
  );
}
