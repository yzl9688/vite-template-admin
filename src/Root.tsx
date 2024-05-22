import { BrowserRouter } from "react-router-dom";
import React from "react";
import MenuRoutes from "./routes";
import { ConfigProvider, message } from "antd";
import { SWRConfig } from "swr";
import { fetcher } from "./utils/fetcher";
import { auth } from "./utils/middleware";

const Root: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#23ccef",
        },
      }}>
      <SWRConfig
        value={{
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
          onError: (err) => {
            err?.info?.message && messageApi.error(err.info?.message);
          },
          use: [auth],
        }}>
        <div className="bg-[#fcfcfa] h-[100vh] overflow-hidden">
          <BrowserRouter basename="/">
            <MenuRoutes />
          </BrowserRouter>
          {contextHolder}
        </div>
      </SWRConfig>
    </ConfigProvider>
  );
};

export default Root;
