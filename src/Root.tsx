import { BrowserRouter } from "react-router-dom";
import React from "react";
import MenuRoutes from "./routes";
import { ConfigProvider } from "antd";
import { SWRConfig } from "swr";
import { ThemeProvider } from "styled-components";
import { useSWRConfig, useThemeConifg } from "./hooks/useConfig";

const Root: React.FC = () => {
  const { swrConfig, contextHolder } = useSWRConfig();
  const { antdProviderConfig, themeProviderConfig } = useThemeConifg();

  return (
    <ConfigProvider theme={antdProviderConfig}>
      <ThemeProvider theme={themeProviderConfig}>
        <SWRConfig value={swrConfig}>
          <div className="h-[100vh] overflow-hidden">
            <BrowserRouter basename="/">
              <MenuRoutes />
            </BrowserRouter>
            {contextHolder}
          </div>
        </SWRConfig>
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default Root;
