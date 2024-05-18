import { IMenu } from "@/types/menu";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface State {
  /**
   * 访问令牌
   */
  token: string;
  /**
   * 当前账号的角色
   */
  role: string | null;
  /**
   * 路由菜单表
   */
  menus: IMenu[];
  /**
   * 当前页面的按钮权限
   */
  btnPermissions: string[];
}

interface Actions {
  setToken: (token: string) => void;
  setRole: (role: string) => void;
  setMenus: (menus: IMenu[]) => void;
  setBtnPermissions: (permissions: string[]) => void;
}

const initialState: State = {
  token: "",
  role: null,
  menus: [],
  btnPermissions: [],
};

export const useGlobalStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      ...initialState,
      setToken: (token) =>
        set((state) => {
          state.token = token;
        }),
      setRole: (role) =>
        set((state) => {
          state.role = role;
        }),
      setMenus: (menus) =>
        set((state) => {
          state.menus = menus;
        }),
      setBtnPermissions: (permissions) =>
        set((state) => {
          state.btnPermissions = permissions;
        }),
      reset: () => set(initialState),
    })),
    {
      name: "global-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
