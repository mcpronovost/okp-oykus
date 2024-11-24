import type {
    AxiosInstance,
    AxiosRequestHeaders,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";
import { API } from "@/services/utils/constants";

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
) => {
    const e = {
        status: response?.status || 0,
        msg: response?.statusText || "An error occurred",
    };
    try {
        const data =
            side === "server"
                ? await (response as Response).json()
                : (response as AxiosResponse)?.data;
        if (response?.status === 400) {
            if (!!data) {
                e.msg = data;
            }
        } else if (response?.status === 401) {
            if (data?.detail?.includes("Token")) {
                e.msg = "Unauthorized access";
            }
        }
        throw Error("Error");
    } catch {
        return JSON.stringify(e);
    }
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
    (error: AxiosError<{ detail?: string }>) => {
        return Promise.reject(doRequestError("client", error.response));
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
        throw Error(await doRequestError("server", response));
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
    method: string,
    url: string,
    data?: any,
    options: RequestInit = {},
): Promise<Response | Error> => {
    let request: RequestInit = {
        method,
        body: data ? JSON.stringify(data) : undefined,
        ...options,
        headers: {
            ...defaultHeaders,
            ...(options.headers as Record<string, string>),
        },
    };
    request = doServerInterceptorRequest(request);
    try {
        const response = await fetch(`${API.BACKEND}/v${API.VERSION}/${url}`, request);
        const result = await doServerInterceptorResponse(response);
        return result;
    } catch (e) {
        if (e instanceof Error) throw e;
        throw Error(JSON.stringify(e));
    }
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
    method: string,
    url: string,
    data?: any,
    options: RequestInit = {},
): Promise<AxiosResponse | Response | Error> => {
    const isServer = typeof window === "undefined";
    if (isServer) {
        // Use fetch for server-side Astro
        try {
            const result = await doServer(method, url, data, options);
            return result;
        } catch (e) {
            if (e instanceof Error) throw e.message;
            throw Error(JSON.stringify(e));
        }
    } else {
        // Use Axios for client-side React
        return doClient.request({
            url,
            method,
            data,
            ...options,
        } as InternalAxiosRequestConfig);
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
    get: (url: string, options: RequestInit = {}) => doRequest("GET", url, undefined, options),
    post: (url: string, data: any = null, options: RequestInit = {}) =>
        doRequest("POST", url, data, options),
    put: (url: string, data: any, options: RequestInit = {}) =>
        doRequest("PUT", url, data, options),
    patch: (url: string, data: any, options: RequestInit = {}) =>
        doRequest("PATCH", url, data, options),
    delete: (url: string, options: RequestInit = {}) =>
        doRequest("DELETE", url, undefined, options),
};

export * from "./authService";
