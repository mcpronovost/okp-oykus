import { useCallback } from "react";
import { useApi } from "./index";

export function useAuthApi() {
  const { get, post } = useApi();

  const login = useCallback(async (data) => {
    const result = await post("/auth/login/", data);
    return result;
  }, [post]);

  const logout = useCallback(async () => {
    const result = await post("/auth/logout/");
    return result;
  }, [post]);

  const validateRat = useCallback(async () => {
    const result = await get("/auth/validate-rat/");
    return result;
  }, [get]);

  const getCurrentUser = useCallback(async () => {
    const result = await get("/auth/me/");
    return result;
  }, [get]);

  return { login, logout, validateRat, getCurrentUser };
}
