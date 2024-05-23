import { UserInfo, IMenu } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface State {
  /**
   * 访问令牌
   */
  token: string;
  /**
   * 用户信息
   */
  userInfo?: UserInfo | null;
  /**
   * 路由菜单表
   */
  menus: IMenu[];
  /**
   * 当前页面的按钮权限
   */
  btnPermissions: string[];
  /**
   * 菜单是否收起
   */
  menuCollapsed: boolean;
}

interface Actions {
  setToken: (token: string) => void;
  setUserInfo: (userInfo: UserInfo | null) => void;
  setMenus: (menus: IMenu[]) => void;
  setBtnPermissions: (permissions: string[]) => void;
  setMenuCollapsed: (collapsed: boolean) => void;
  reset: () => void;
}

const initialState = {
  token: "",
  userInfo: null,
  menus: [],
  btnPermissions: [],
};

export const useGlobalStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      ...initialState,
      menuCollapsed: false,
      setToken: (token) =>
        set((state) => {
          state.token = token;
        }),
      setUserInfo: (userInfo) =>
        set((state) => {
          state.userInfo = userInfo;
        }),
      setMenus: (menus) =>
        set((state) => {
          state.menus = menus;
        }),
      setBtnPermissions: (permissions) =>
        set((state) => {
          state.btnPermissions = permissions;
        }),
      setMenuCollapsed: (collapsed) =>
        set((state) => {
          state.menuCollapsed = collapsed;
        }),
      reset: () => set(initialState),
    })),
    {
      name: "global-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
