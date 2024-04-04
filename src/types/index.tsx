export type TAsideLinks = {
  name: string;
  link: string;
};
export interface IRequestOptions {
  baseUrl?: string;
  path: string;
  method?: "get" | "post" | "put" | "patch" | "delete" | "options";
  params?: Record<string | symbol | number, any>;
  body?: any;
  headers?: Record<string | symbol | number, any>;
}
export enum TEnv {
  VITE_BASE_URL = "VITE_BASE_URL",
}
export interface IRequestUrl {
  baseUrl?: string;
  path?: string;
}
