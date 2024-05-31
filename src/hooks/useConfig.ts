import { swrConfig } from "@/config/swrConfig";
import { themeConfig } from "@/config/themeConfig";
import { ThemeEnum } from "@/enums/appEnums";
import { useGlobalStore } from "@/stores";
import { useThemeStore } from "@/stores/theme";
import { ThemeConfig, message, theme } from "antd";
import { useEffect } from "react";
import { SWRConfiguration } from "swr";

// 主题配置
export const useThemeConifg = () => {
  const themeMode = useThemeStore((state) => state.theme);
  const colorPrimary = useThemeStore((state) => state.colorPrimary);

  // tailwindcss 主题切换
  useEffect(() => {
    if (themeMode == ThemeEnum.DARK) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeMode]);

  useEffect(() => {
    document.documentElement.style.setProperty("--color-primary", colorPrimary);
  }, [colorPrimary]);

  const antdProviderConfig: ThemeConfig = {
    algorithm: themeMode == ThemeEnum.LIGHT ? theme.defaultAlgorithm : theme.darkAlgorithm,
    token: {
      colorPrimary: colorPrimary,
      colorBgLayout:
        themeMode == ThemeEnum.LIGHT
          ? themeConfig.backgroundColor
          : themeConfig.darkBackgroundColor,
    },
    components: {
      Layout: {
        headerHeight: themeConfig.headerHeight,
        headerBg: themeMode == ThemeEnum.LIGHT ? "#fff" : themeConfig.darkBackgroundColor,
        headerPadding: 0,
      },
    },
  };

  const themeProviderConfig = {
    themeMode: themeMode,
    ...themeConfig,
    colorPrimary,
  };

  return {
    antdProviderConfig,
    themeProviderConfig,
  };
};

// SWR配置
export const useSWRConfig = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const reset = useGlobalStore((state) => state.reset);

  const config: SWRConfiguration = {
    ...swrConfig,
    onError: (err) => {
      err?.info?.message && messageApi.error(err.info?.message);
      if (err?.info?.code == 401) {
        // token已过期，跳转登录页
        setTimeout(() => {
          reset();
          location.reload();
        }, 300);
      }
    },
  };

  return {
    swrConfig: config,
    contextHolder,
  };
};
