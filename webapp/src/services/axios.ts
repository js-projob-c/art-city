import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";
import Cookies from "js-cookie";
import { isNil } from "lodash";

import { ACCESS_TOKEN_KEY } from "@/common/constants/variables";
import { EncryptionUtil } from "@/common/utils/encryption";
import { TokenUtil } from "@/common/utils/token";

export interface UseRequestPayload<Body = Record<string, any>> {
  body?: Body;
  query?: Record<string, any>;
  param?: Record<string, string>;
  headers?: Record<string, any>;
  options?: Record<string, any>;
}

export const ApiMethod = {
  GET: "get" as Method,
  POST: "post" as Method,
  PUT: "put" as Method,
  DELETE: "delete" as Method,
  PATCH: "patch" as Method,
};

export interface ApiObject {
  url: string;
  method: (typeof ApiMethod)[keyof typeof ApiMethod];
}

export default class Axios {
  private axiosClient: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosClient = axiosInstance;
    this.setTimeout();
    this.useSetHeaderInterceptor();
    this.useRedirectInterceptor();
  }

  setTimeout(time = 50000) {
    this.axiosClient.defaults.timeout = time;
  }

  private useSetHeaderInterceptor() {
    this.axiosClient.interceptors.request.use(
      (config) => {
        const encryptedToken = Cookies.get(ACCESS_TOKEN_KEY);
        const accessToken = EncryptionUtil.decrypt(encryptedToken || "");

        if (config?.headers && accessToken) {
          const details = TokenUtil.decodeToken(accessToken);
          const right = details?.right;
          config.headers.Authorization = `Bearer ${accessToken}`;
          config.headers["x-admin-right"] = right;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  private useRedirectInterceptor() {
    this.axiosClient.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        console.log("AXIOS error", error?.response);
        if (error?.response?.status === 401) {
          if (!isNil(Cookies.get(ACCESS_TOKEN_KEY))) {
            // 1.Redirect to login page
            window.location.href = "/auth";
            Cookies.remove(ACCESS_TOKEN_KEY);
          }
          //or 2.Request refresh token
        }
        return Promise.reject(error?.response || error);
      }
    );
  }

  private async getRequest(
    url: string,
    payload: UseRequestPayload | undefined = {},
    config: AxiosRequestConfig<any> | undefined = undefined
  ): Promise<AxiosResponse<any, any>> {
    const { query = {}, param = {} } = payload;
    const urlWithParam = this.mapParamsToUrl(url, param);
    const urlWithQueryAndParam = this.mapQueryToUrl(urlWithParam, query);
    return await this.axiosClient.get(urlWithQueryAndParam, config);
  }

  private async postRequest(
    url: string,
    payload: UseRequestPayload | undefined = {},
    config: AxiosRequestConfig<any> | undefined = undefined
  ): Promise<AxiosResponse<any, any>> {
    const { body = {} } = payload;
    return await this.axiosClient.post(url, body, config);
  }

  private async putRequest(
    url: string,
    payload: UseRequestPayload | undefined = {},
    config: AxiosRequestConfig<any> | undefined = undefined
  ): Promise<AxiosResponse<any, any>> {
    const { query = {}, body = {}, param = {} } = payload;
    const urlWithParam = this.mapParamsToUrl(url, param);
    const urlWithQueryAndParam = this.mapQueryToUrl(urlWithParam, query);
    return await this.axiosClient.put(urlWithQueryAndParam, body, config);
  }

  private async patchRequest(
    url: string,
    payload: UseRequestPayload | undefined = {},
    config: AxiosRequestConfig<any> | undefined = undefined
  ): Promise<AxiosResponse<any, any>> {
    const { query = {}, body = {}, param = {} } = payload;
    const urlWithParam = this.mapParamsToUrl(url, param);
    const urlWithQueryAndParam = this.mapQueryToUrl(urlWithParam, query);
    return await this.axiosClient.patch(urlWithQueryAndParam, body, config);
  }

  private async delRequest(
    url: string,
    payload: UseRequestPayload | undefined = {},
    config: AxiosRequestConfig<any> | undefined = undefined
  ): Promise<AxiosResponse<any, any>> {
    const { param = {} } = payload;
    const urlWithParam = this.mapParamsToUrl(url, param);
    return await this.axiosClient.delete(urlWithParam, config);
  }

  private mapParamsToUrl(url: string, params: Record<string, string>) {
    return Object.entries(params).reduce((acc, [key, value]) => {
      return acc.replace(`:${key}`, value);
    }, url);
  }

  private mapQueryToUrl(url: string, query: Record<string, string>) {
    const queryString = Object.entries(query)
      .map(([key, value]) => {
        return `${key}=${value}`;
      })
      ?.join("&");
    return queryString ? `${url}?${queryString}` : url;
  }

  async use(
    apiObject: ApiObject,
    payload: UseRequestPayload | undefined = {},
    config: AxiosRequestConfig<any> | undefined = {}
  ): Promise<AxiosResponse<any, any>> {
    const url = apiObject.url;
    const method = apiObject.method;
    if (payload?.headers) {
      config.headers = payload.headers;
    }
    switch (method) {
      case "get":
        return await this.getRequest(url, payload, config);
      case "post":
        return await this.postRequest(url, payload, config);
      case "put":
        return await this.putRequest(url, payload, config);
      case "patch":
        return await this.patchRequest(url, payload, config);
      case "delete":
        return await this.delRequest(url, payload, config);
      default:
        return await this.getRequest(url, payload, config);
    }
  }
}

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY || "",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_API_KEY || "*",
  },
});

export const axiosFileInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY || "",
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_API_KEY || "*",
  },
});

export const axiosClient = new Axios(axiosInstance);
export const axiosFileUploadClient = new Axios(axiosFileInstance);
axiosFileUploadClient.setTimeout(10000);
