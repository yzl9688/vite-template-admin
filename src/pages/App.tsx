import { useGlobalStore } from "@/stores";
import { Layout, Menu, MenuProps } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import menus from "@/routes/config";
import { IMenu } from "@/types/menu";
import { isArray } from "lodash";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/layouts/header/Header";
import Sider from "@/layouts/sider/Sider";
import { useThemeSetting } from "@/stores/theme";

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

const App: React.FC = () => {
  const remoteMenus = useGlobalStore((state) => state.menus);
  const [allMenus, setAllMenus] = useState<MenuItem[]>([]);
  const menuMode = useThemeSetting((state) => state.menuMode);

  useEffect(() => {
    const _menus = generateMenus([...menus, ...remoteMenus]);

    setAllMenus(_menus);
  }, [remoteMenus]);

  const Content = (
    <Layout.Content className="m-[12px] bg-white rounded-s p-[12px]">
      <Outlet />
    </Layout.Content>
  );

  if (menuMode == "left") {
    return (
      <Layout className="h-full">
        <Sider menus={allMenus} />
        <Layout>
          <Header menus={allMenus} />
          {Content}
        </Layout>
      </Layout>
    );
  }

  return (
    <Layout className="h-full">
      <Header menus={allMenus} />
      <Layout>
        {menuMode == "topLeft" && <Sider menus={allMenus} />}
        {Content}
      </Layout>
    </Layout>
  );
};

export default App;
