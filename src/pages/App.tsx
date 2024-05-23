import { useGlobalStore } from "@/stores";
import { Layout } from "antd";
import React, { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import menus from "@/routes/config";
import { IMenu } from "@/types/menu";
import { isArray } from "lodash";
import Header from "@/layouts/header/Header";
import Sider from "@/layouts/sider/Sider";
import { useThemeSetting } from "@/stores/theme";
import { usePullMenus, usePullUserInfo } from "@/hooks/usePullData";

export type MenuItem = {
  key: string;
  label?: string;
  icon?: React.ReactNode | string;
  children?: MenuItem[];
};

// 生成菜单
const generateMenus: (menus: IMenu[]) => MenuItem[] = (menus) => {
  return menus
    .filter((item) => !item.hidden)
    .map((item) => {
      return {
        key: item.path,
        label: item.title,
        // todo: icon为string时，渲染iconfont组件
        icon: item.icon,
        children: isArray(item.children)
          ? generateMenus(item.children)
          : undefined,
      };
    });
};

// 查找一级菜单
const findFirstLevelMenu: (
  path: string,
  menus: MenuItem[],
) => MenuItem | undefined = (path, menus) => {
  const menu = menus.find(
    (item) =>
      path.indexOf(item?.key) == 0 &&
      ["/", undefined].includes(path[item.key.length]),
  );

  return menu;
};

const App: React.FC = () => {
  const remoteMenus = useGlobalStore((state) => state.menus);
  const menuMode = useThemeSetting((state) => state.menuMode);
  const location = useLocation();
  usePullUserInfo();
  usePullMenus();

  const allMenus = useMemo(() => {
    return generateMenus([...menus, ...remoteMenus]);
  }, [remoteMenus]);

  const firstMenu = useMemo(() => {
    return findFirstLevelMenu(location.pathname, allMenus);
  }, [location.pathname, allMenus]);

  const Content = useMemo(
    () => (
      <Layout.Content className="m-[12px] bg-white rounded-s p-[12px]">
        <Outlet />
      </Layout.Content>
    ),
    [],
  );

  if (menuMode == "left") {
    return (
      <Layout className="h-full">
        <Sider menus={allMenus} firstMenu={firstMenu} />
        <Layout>
          <Header menus={allMenus} firstMenu={firstMenu} />
          {Content}
        </Layout>
      </Layout>
    );
  }

  return (
    <Layout className="h-full">
      <Header menus={allMenus} firstMenu={firstMenu} />
      <Layout>
        {menuMode == "topLeft" && (firstMenu?.children || []).length ? (
          <Sider menus={allMenus} firstMenu={firstMenu} />
        ) : null}
        {Content}
      </Layout>
    </Layout>
  );
};

export default App;
