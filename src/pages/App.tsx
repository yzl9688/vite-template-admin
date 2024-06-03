import { useGlobalStore } from "@/stores";
import { Layout } from "antd";
import React, { useMemo } from "react";
import menus from "@/routes/config";
import { AntMenuItem, IMenu } from "@/types/menu";
import { isArray, isString } from "lodash";
import Header from "@/layouts/header/Header";
import Sider from "@/layouts/sider/Sider";
import { useThemeStore } from "@/stores/theme";
import { usePullMenus, usePullUserInfo } from "@/hooks/usePullData";
import { MenuModeEnum } from "@/enums/appEnums";
import IconFont from "@/components/IconFont";
import Content from "@/layouts/content/Content";

// 生成菜单
const generateMenus: (menus: IMenu[]) => AntMenuItem[] = (menus) => {
  return menus
    .filter((item) => !item.hidden)
    .map((item) => {
      return {
        key: item.path,
        label: item.title,
        icon: isString(item.icon) ? <IconFont type={item.icon} /> : item.icon,
        children: isArray(item.children) ? generateMenus(item.children) : undefined,
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

  const HeaderMemo = useMemo(() => {
    return <Header menus={allMenus} />;
  }, [allMenus]);

  const SiderMemo = useMemo(() => {
    return <Sider menus={allMenus} />;
  }, [allMenus]);

  if (menuMode == MenuModeEnum.LEFT) {
    return (
      <Layout className="h-full">
        {SiderMemo}
        <Layout>
          {HeaderMemo}
          <Content />
        </Layout>
      </Layout>
    );
  }

  return (
    <Layout className="h-full">
      {HeaderMemo}
      <Layout>
        {menuMode == MenuModeEnum.TOP_LEFT ? SiderMemo : null}
        <Content />
      </Layout>
    </Layout>
  );
};

export default App;
