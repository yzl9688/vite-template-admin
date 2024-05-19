import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type MenuMode = "top" | "left" | "topLeft";

interface State {
  /**
   * 菜单布局模式
   * top: 顶部菜单
   * left: 左侧菜单
   * topLeft: 顶部左侧联动菜单
   */
  menuMode: MenuMode;
}

interface Action {
  setMenuMode: (mode: MenuMode) => void;
}

export const useThemeSetting = create<State & Action>()(
  persist(
    immer((set) => ({
      menuMode: "topLeft",
      setMenuMode: (mode) =>
        set((state) => {
          state.menuMode = mode;
        }),
    })),
    {
      name: "theme-setting",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
