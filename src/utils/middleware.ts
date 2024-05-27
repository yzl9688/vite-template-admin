import { useGlobalStore } from "@/stores";
import { RequestParams } from "@/types";
import { isString } from "lodash";
import { useCallback } from "react";
import { Middleware, SWRHook } from "swr";

// 为每个请求设置请求头
export const auth: Middleware = (useSWRNext: SWRHook) => {
  return (key, fetcher, config) => {
    const token = useGlobalStore((state) => state.token);

    // 扩展fetcher
    const extendedFetcher = useCallback(
      (
        args:
          | string
          | (Omit<RequestParams, "headers"> & { manualTrigger?: boolean }),
        { arg }: { arg?: object } = { arg: undefined },
      ) => {
        const params: RequestParams & { manualTrigger?: boolean } = {
          url: "",
        };
        if (isString(args)) {
          params.url = args;
        } else {
          Object.assign(params, args);
        }

        if (arg) {
          params.params = arg;
        }

        const headers = new Headers();
        headers.append("Authorization", token);
        headers.append("Content-Type", "application/json");

        params.headers = headers;

        return fetcher
          ? params.manualTrigger
            ? fetcher(params.url, { arg: params })
            : fetcher(params)
          : Promise.reject(new Error("未指定fetcher."));
      },
      [token],
    );

    return useSWRNext(key, extendedFetcher, config);
  };
};
