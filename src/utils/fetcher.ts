import { RequestParams } from "@/types";
import { isString } from "lodash";

export const fetcher: (args: string | RequestParams) => Promise<any> = async (
  args,
) => {
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
    const error: any = new Error("An error occurred while fetching the data.");
    error.info = data;
    error.status = data?.code || res.status;

    throw error;
  }

  return data;
};
