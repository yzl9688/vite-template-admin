import { fetcher } from "@/utils/fetcher";
import { auth } from "@/utils/middleware";
import { SWRConfiguration } from "swr";

export const swrConfig: SWRConfiguration = {
  errorRetryCount: 3,
  fetcher: fetcher,
  errorRetryInterval: 5000,
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    if (error?.status == 404) return;
    if (key == "/login") return;

    if (retryCount >= (config?.errorRetryCount || 3)) return;

    // 5秒后重试
    setTimeout(
      () => revalidate({ retryCount: retryCount }),
      config.errorRetryInterval || 5000,
    );
  },
  use: [auth],
};
