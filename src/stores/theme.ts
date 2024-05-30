import { themeConfig } from "@/config/themeConfig";
import { MenuModeEnum, ThemeEnum } from "@/enums/appEnums";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface State {
  /**
   * 菜单布局模式
   * top: 顶部菜单
   * left: 左侧菜单
   * topLeft: 顶部左侧联动菜单
   */
  menuMode: MenuModeEnum;
  /**
   * 主题
   */
  theme: ThemeEnum;
  /**
   * 主题色
   */
  colorPrimary: string;
}

interface Action {
  setMenuMode: (mode: MenuModeEnum) => void;
  setTheme: (theme: ThemeEnum) => void;
  setColorPrimary: (color: string) => void;
}

export const useThemeStore = create<State & Action>()(
  persist(
    immer((set) => ({
      menuMode: MenuModeEnum.TOP_LEFT,
      theme: ThemeEnum.LIGHT,
      colorPrimary: themeConfig.colorPrimary,
      setColorPrimary: (color) =>
        set((state) => {
          state.colorPrimary = color;
        }),
      setMenuMode: (mode) =>
        set((state) => {
          state.menuMode = mode;
        }),
      setTheme: (theme) =>
        set((state) => {
          state.theme = theme;
        }),
    })),
    {
      name: "theme-setting",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
