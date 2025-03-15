import { useCallback } from "react";
import { useApi } from "./index";

export function useForumApi() {
  const { get, post } = useApi();

  const getTopic = useCallback(async (id, page = 1, params) => {
    const queryParams = params ? `&${new URLSearchParams(params).toString()}` : "";
    try {
      const result = await get(`/forum/topics/${id}/?page=${page}${queryParams.toString()}`);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }, [get]);

  const createPost = useCallback(async (data) => {
    try {
      const result = await post(`/forum/posts/create/`, data);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }, [post]);

  return { getTopic, createPost };
}