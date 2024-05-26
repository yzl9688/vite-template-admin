import { swrConfig } from "@/config/swrConfig";
import { themeConfig } from "@/config/themeConfig";
import { ThemeEnum } from "@/enums/appEnums";
import { useThemeStore } from "@/stores/theme";
import { ThemeConfig, message, theme } from "antd";
import { useEffect } from "react";
import { SWRConfiguration } from "swr";

// 主题配置
export const useThemeConifg = () => {
  const themeMode = useThemeStore((state) => state.theme);

  // tailwindcss 主题切换
  useEffect(() => {
    if (themeMode == ThemeEnum.DARK) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeMode]);

  const antdProviderConfig: ThemeConfig = {
    algorithm:
      themeMode == ThemeEnum.LIGHT
        ? theme.defaultAlgorithm
        : theme.darkAlgorithm,
    token: {
      colorPrimary: themeConfig.colorPrimary,
      colorBgLayout:
        themeMode == ThemeEnum.LIGHT
          ? themeConfig.backgroundColor
          : themeConfig.darkBackgroundColor,
    },
    components: {
      Layout: {
        headerHeight: themeConfig.headerHeight,
        headerBg:
          themeMode == ThemeEnum.LIGHT
            ? "#fff"
            : themeConfig.darkBackgroundColor,
        headerPadding: 0,
      },
    },
  };

  const themeProviderConfig = {
    themeMode: themeMode,
    ...themeConfig,
  };

  return {
    antdProviderConfig,
    themeProviderConfig,
  };
};

// SWR配置
export const useSWRConfig = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const config: SWRConfiguration = {
    ...swrConfig,
    onError: (err) => {
      err?.info?.message && messageApi.error(err.info?.message);
    },
  };

  return {
    swrConfig: config,
    contextHolder,
  };
};
