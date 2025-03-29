import { API_URL, API_HEADERS, okpEncode, okpDecode } from "./utils";

class OkpApi {
  constructor() {
    this.token = localStorage.getItem("okp-oykus-rat");
    this.lang = window.document.documentElement.lang;
  }

  async request(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    const headers = {
      ...API_HEADERS,
      ...options.headers,
      "Accept-Language": this.lang,
    };

    if (this.token) {
      headers.Authorization = `Okp ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        let errorMsg = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMsg = JSON.stringify(errorData);
        } catch (err) {
          errorMsg = `HTTP error! status: ${response.status}`;
        }
        throw new Error(errorMsg);
      }

      if (response.status === 204) {
        return {
          success: true,
        };
      }

      const data = await response.json();
      return {
        success: true,
        ...data,
      };
    } catch (err) {
      throw err;
    }
  }

  get(endpoint) {
    return this.request(endpoint, { method: "GET" });
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" });
  }

  async login(data) {
    const result = await this.post("/auth/login/", data);
    return result;
  }

  async logout() {
    const result = await this.post("/auth/logout/");
    return result;
  }

  async getCurrentUser() {
    const result = await this.get("/auth/me/");
    return result;
  }

  async createTopic(data) {
    const result = await this.post("/forum/topics/create/", data);
    return result;
  }

  async createPost(data) {
    const result = await this.post("/forum/posts/create/", data);
    return result;
  }

  async deletePost(id) {
    const result = await this.delete(`/forum/posts/${id}/delete/`);
    return result;
  }
}

export const okpApi = new OkpApi();
export { okpEncode, okpDecode };