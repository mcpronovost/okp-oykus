import type { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { API } from "@/services/utils/constants";

// Default headers
const defaultHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "x-okp-api-version": API.VERSION,
};

// Create axios instance with default config
// This instance will be used for making API calls throughout the application
export const clientRequest: AxiosInstance = axios.create({
    baseURL: `${API.URL}/v${API.VERSION}/`,
    withCredentials: false,
    headers: defaultHeaders,
});

// Add request interceptor
// This interceptor adds the Authorization header with the token if it exists
clientRequest.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(API.STORAGE.RAT);
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `OKP ${token}`;
    }
    return config;
});

// Add response interceptor
// This interceptor processes responses and handles specific error cases
clientRequest.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<{ detail?: string }>) => {
        if (error.response?.status === 401 && error.response?.data?.detail?.includes("Token")) {
            console.log("Unauthorized access");
            console.log(error.response);
            // Handle unauthorized access
            // Redirect to login or handle as needed
        }
        return Promise.reject(error);
    },
);

// Add these functions at the top with your other configurations
const fetchRequestInterceptor = (request: RequestInit) => {
    // Server-side request modifications if needed
    return request;
};

const fetchResponseInterceptor = async (response: Response) => {
    if (!response.ok) {
        const e = {
            status: response.status,
            msg: response.statusText,
        };
        try {
            const data = await response.json();
            if (response.status === 400) {
                if (!!data) {
                    e.msg = data;
                }
            } else if (response.status === 401) {
                if (data.detail?.includes("Token")) {
                    e.msg = "Unauthorized access";
                }
            }
            throw Error("Error");
        } catch {
            throw Error(JSON.stringify(e));
        }
    }
    return response;
};

const serverRequest = async (method: string, url: string, data?: any, options: RequestInit = {}): Promise<Response | Error> => {
    // Use fetch for server-side Astro with interceptors
    let request: RequestInit = {
        method,
        body: data ? JSON.stringify(data) : undefined,
        ...options,
        headers: {
            ...defaultHeaders,
            ...(options.headers as Record<string, string>),
        },
    };

    // Apply request interceptor
    request = fetchRequestInterceptor(request);

    try {
        const response = await fetch(`${API.BACKEND}/v${API.VERSION}/${url}`, request);
        const result = await fetchResponseInterceptor(response);
        return result;
    } catch (e) {
        if (e instanceof Error) throw e;
        throw Error(JSON.stringify(e));
    }
}

const doRequest = async (method: string, url: string, data?: any, options: RequestInit = {}): Promise<AxiosResponse | Response | Error> => {
    const isServer = typeof window === "undefined";
    if (isServer) {
        // Use fetch for server-side Astro with interceptors
        try {
            const result = await serverRequest(method, url, data, options);
            return result;
        } catch (e) {
            if (e instanceof Error) throw e.message;
            throw Error(JSON.stringify(e));
        }
    } else {
        // Use Axios for client-side React
        return clientRequest.request({
            url,
            method,
            data,
            ...options,
        } as InternalAxiosRequestConfig);
    }
};

export const api = {
    get: (url: string, options: RequestInit = {}) => doRequest("GET", url, undefined, options),
    post: (url: string, data: any = null, options: RequestInit = {}) => doRequest("POST", url, data, options),
    put: (url: string, data: any, options: RequestInit = {}) => doRequest("PUT", url, data, options),
    patch: (url: string, data: any, options: RequestInit = {}) => doRequest("PATCH", url, data, options),
    delete: (url: string, options: RequestInit = {}) => doRequest("DELETE", url, undefined, options),
};

export * from "./authService";
