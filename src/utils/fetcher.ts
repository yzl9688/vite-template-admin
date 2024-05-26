import { RequestParams, ResponseData } from "@/types";
import { isString } from "lodash";
import { JsonBodyType } from "msw";

class FetchError extends Error {
  info?: ResponseData<unknown>;
  status: number;

  constructor(message: string, status: number, info?: ResponseData<unknown>) {
    super(message);
    this.status = status;
    this.info = info;
  }
}

export const fetcher: (
  args: string | RequestParams,
) => Promise<JsonBodyType> = async (args) => {
  let url,
    method = "GET",
    params = {},
    headers = {};

  if (isString(args)) {
    url = args;
  } else {
    url = args.url;
    method = args.method || "GET";
    params = args.params || {};
    headers = args?.headers || {};
  }

  const res = await fetch(import.meta.env.VITE_BASE_URL + url, {
    method,
    body: method == "GET" ? undefined : JSON.stringify(params),
    headers,
  });

  const data = await res.json();

  if (!res.ok || data?.code !== 200) {
    const error = new FetchError(
      "An error occurred while fetching the data.",
      data?.code || res.status,
      data,
    );

    throw error;
  }

  return data;
};
