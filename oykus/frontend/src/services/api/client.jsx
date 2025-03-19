import { useCallback, useState } from "react";
import { API_URL, API_HEADERS } from "./utils";
import { getLang } from "@/services/router/utils";
function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (endpoint, options = {}) => {
    const url = `${API_URL}${endpoint}`;
    const headers = { ...API_HEADERS, ...options.headers, "Accept-Language": getLang() };

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        ...data,
      };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const get = useCallback(
    (endpoint) => {
      return request(endpoint, { method: "GET" });
    },
    [request]
  );

  const post = useCallback(
    (endpoint, data) => {
      return request(endpoint, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    [request]
  );

  const put = useCallback(
    (endpoint, data) => {
      return request(endpoint, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    [request]
  );

  const del = useCallback(
    (endpoint) => {
      return request(endpoint, { method: "DELETE" });
    },
    [request]
  );

  return {
    get,
    post,
    put,
    delete: del,
    loading,
    error,
  };
}

export { useApi };
