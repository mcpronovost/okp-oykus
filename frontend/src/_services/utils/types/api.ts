import { HTTP_METHODS } from "@/services/utils/constants";

export type HttpMethodType = (typeof HTTP_METHODS)[keyof typeof HTTP_METHODS];
