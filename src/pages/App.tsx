import { useGlobalStore } from "@/stores";
import { Layout } from "antd";
import React, { useMemo } from "react";
import { Outlet } from "react-router-dom";
import menus from "@/routes/config";
import { IMenu } from "@/types/menu";
import { isArray, isString } from "lodash";
import Header from "@/layouts/header/Header";
import Sider from "@/layouts/sider/Sider";
import { useThemeStore } from "@/stores/theme";
import { usePullMenus, usePullUserInfo } from "@/hooks/usePullData";
import { MenuModeEnum } from "@/enums/appEnums";
import IconFont from "@/components/IconFont";

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
        icon: isString(item.icon) ? <IconFont type={item.icon} /> : item.icon,
        children: isArray(item.children)
          ? generateMenus(item.children)
          : undefined,
      };
    });
};

const App: React.FC = () => {
  const remoteMenus = useGlobalStore((state) => state.menus);
  const menuMode = useThemeStore((state) => state.menuMode);
  usePullUserInfo();
  usePullMenus();

  const allMenus = useMemo(() => {
    return generateMenus([...menus, ...remoteMenus]);
  }, [remoteMenus]);

  const Content = useMemo(
    () => (
      <Layout.Content className="m-[12px] rounded-s overflow-hidden overflow-y-auto">
        <Outlet />
      </Layout.Content>
    ),
    [],
  );

  const HeaderMemo = useMemo(() => {
    return <Header menus={allMenus} />;
  }, [menus]);

  const SiderMemo = useMemo(() => {
    return <Sider menus={allMenus} />;
  }, [menus]);

  if (menuMode == MenuModeEnum.LEFT) {
    return (
      <Layout className="h-full">
        {SiderMemo}
        <Layout>
          {HeaderMemo}
          {Content}
        </Layout>
      </Layout>
    );
  }

  return (
    <Layout className="h-full">
      {HeaderMemo}
      <Layout>
        {menuMode == MenuModeEnum.TOP_LEFT ? SiderMemo : null}
        {Content}
      </Layout>
    </Layout>
  );
};

export default App;
