import type {
    AxiosInstance,
    AxiosRequestHeaders,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig,
} from "axios";
import type { HttpMethodType } from "@/services/utils/types/api";
import axios from "axios";
import { API, HTTP_METHODS } from "@/services/utils/constants";

interface ApiErrorResponse {
    status: number;
    msg: string;
    detail?: string;
}

/**
 * Default headers for API requests
 */
const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-okp-api-version": API.VERSION,
};

/**
 * Processes request errors and formats them consistently
 * @param side - Whether the error occurred on "client" or "server" side
 * @param response - The error response from the request
 * @returns Stringified error object with status and message
 */
const doRequestError = async (
    side: "client" | "server",
    response: AxiosResponse | Response | undefined,
): Promise<ApiErrorResponse> => {
    const errorResponse: ApiErrorResponse = {
        status: response?.status || 0,
        msg: "An error occurred",
    };

    if (response) {
        try {
            const data =
                side === "server"
                    ? await (response as Response).json()
                    : (response as AxiosResponse)?.data;

            switch (response.status) {
                case 400:
                    errorResponse.msg = data || errorResponse.msg;
                    break;
                case 401:
                    errorResponse.msg = data?.detail?.includes("Token")
                        ? "Unauthorized access"
                        : errorResponse.msg;
                    break;
            }
        } catch {
            // If parsing fails, we'll use the default error
        }
    }

    return errorResponse;
};

/**
 * Adds authorization header to request if token exists
 * @param headers - Current request headers
 * @param token - Authorization token
 * @returns Updated headers with authorization
 */
const addAuthorizationHeader = (
    side: "client" | "server",
    headers: Record<string, string> | AxiosRequestHeaders,
): Record<string, string> | AxiosRequestHeaders => {
    const token =
        side === "client"
            ? localStorage.getItem(API.STORAGE.RAT)
            : globalThis.currentCookies[API.STORAGE.RAT];
    if (token) {
        headers.Authorization = `OKP ${token}`;
    }
    return headers;
};

/**
 * Axios instance configured for client-side API requests
 */
export const doClient: AxiosInstance = axios.create({
    baseURL: `${API.URL}/v${API.VERSION}/`,
    withCredentials: false,
    headers: defaultHeaders,
});

// Add request interceptor
// This interceptor adds the Authorization header with the token if it exists
doClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.headers = addAuthorizationHeader("client", config.headers) as AxiosRequestHeaders;
    return config;
});

// Add response interceptor
// This interceptor processes responses and handles specific error cases
doClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError<{ detail?: string }>) => {
        return Promise.reject(await doRequestError("client", error.response));
    },
);

// Add request interceptor
const doServerInterceptorRequest = (request: RequestInit) => {
    request.headers = addAuthorizationHeader("server", request.headers as Record<string, string>);
    return request;
};

// Add response interceptor
const doServerInterceptorResponse = async (response: Response) => {
    if (!response.ok) {
        throw Error(JSON.stringify(await doRequestError("server", response)));
    }
    return response;
};

/**
 * Makes a server-side request using fetch API
 * @param method - HTTP method to use
 * @param url - API endpoint URL
 * @param data - Request payload (optional)
 * @param options - Additional fetch options
 * @returns Promise resolving to Response or Error
 */
const doServer = async (
    method: HttpMethodType,
    url: string,
    data?: unknown,
    options: RequestInit = {},
): Promise<Response> => {
    const request: RequestInit = {
        method,
        body: data ? JSON.stringify(data) : undefined,
        ...options,
        headers: {
            ...defaultHeaders,
            ...(options.headers as Record<string, string>),
        },
    };

    const interceptedRequest = doServerInterceptorRequest(request);
    const response = await fetch(`${API.BACKEND}/v${API.VERSION}/${url}`, interceptedRequest);
    return doServerInterceptorResponse(response);
};

/**
 * Universal request handler that works both client and server side
 * Uses Axios for client-side requests and fetch for server-side
 * @param method - HTTP method to use
 * @param url - API endpoint URL
 * @param data - Request payload (optional)
 * @param options - Additional request options
 * @returns Promise resolving to AxiosResponse, Response, or Error
 */
const doRequest = async (
    method: HttpMethodType,
    url: string,
    data?: unknown,
    options: RequestInit = {},
): Promise<AxiosResponse | Response> => {
    const isServer = typeof window === "undefined";

    try {
        if (isServer) {
            return await doServer(method, url, data, options);
        }

        return await doClient.request({
            url,
            method,
            data,
            ...options,
        } as InternalAxiosRequestConfig);
    } catch (error) {
        if (error instanceof Error) throw error.message;
        throw JSON.stringify(error);
    }
};

/**
 * API client with methods for common HTTP operations
 */
export const api = {
    /**
     * Perform GET request
     * @param url - API endpoint URL
     * @param options - Request options
     */
    get: (url: string, options: RequestInit = {}) =>
        doRequest(HTTP_METHODS.GET, url, undefined, options),
    post: (url: string, data?: unknown, options: RequestInit = {}) =>
        doRequest(HTTP_METHODS.POST, url, data, options),
    put: (url: string, data: unknown, options: RequestInit = {}) =>
        doRequest(HTTP_METHODS.PUT, url, data, options),
    patch: (url: string, data: unknown, options: RequestInit = {}) =>
        doRequest(HTTP_METHODS.PATCH, url, data, options),
    delete: (url: string, options: RequestInit = {}) =>
        doRequest(HTTP_METHODS.DELETE, url, undefined, options),
};

export * from "./authApi";
