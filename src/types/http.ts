import { RequestEnum } from "@/enums/httpEnums";

export interface ResponseData<T> {
  code: number;
  data: T | null;
  message: string;
}

export interface RequestParams {
  url: string;
  method?: RequestEnum;
  params?: object;
  headers?: Headers;
}
