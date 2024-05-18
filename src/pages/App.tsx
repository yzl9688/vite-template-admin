import { useGlobalStore } from "@/stores";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, MenuProps } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import menus from "@/routes/config";
import { IMenu } from "@/types/menu";
import { isArray } from "lodash";
import { AnimatePresence, motion } from "framer-motion";

type MenuItem = {
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

// 获取当前菜单的父级菜单
const findOpenedKeys: (path: string, menus: MenuItem[]) => string[] = (
  path,
  menus,
) => {
  for (let i = 0; i < menus.length; i++) {
    const currentMenu = menus[i];

    if (currentMenu.key == path) return [currentMenu.key];
    if (isArray(currentMenu.children)) {
      const res = findOpenedKeys(path, currentMenu.children);
      if (res.length) {
        return [currentMenu.key, ...res];
      }
    }
  }
  return [];
};

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const remoteMenus = useGlobalStore((state) => state.menus);
  const [allMenus, setAllMenus] = useState<MenuItem[]>([]);
  const [selectedTopKey, setSelectedTopKey] = useState<string>("");
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openedKeys, setOpenedKeys] = useState<string[]>([]);
  const [leftMenus, setLeftMenus] = useState<MenuItem[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const _menus = generateMenus([...menus, ...remoteMenus]);

    setAllMenus(_menus);
  }, [remoteMenus]);

  useEffect(() => {
    const topMenu = allMenus.find(
      (item) => location.pathname.indexOf(item?.key) == 0,
    );

    if (topMenu) {
      setSelectedTopKey(topMenu.key);
      setLeftMenus(topMenu.children as MenuItem[]);
      setSelectedKeys([location.pathname]);

      // 获取需要打开的菜单
      const keys = findOpenedKeys(location.pathname, topMenu.children || []);
      // 删除当前菜单的key
      keys.pop();
      setOpenedKeys(keys || []);
    }
  }, [location, allMenus]);

  // 顶部菜单
  const topMenus = useMemo(
    () =>
      allMenus.map((item) => ({ ...item, children: undefined }) as MenuItem),
    [allMenus],
  );
  const handleClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };
  const handleOpenChange: MenuProps["onOpenChange"] = (openedKeys) => {
    setOpenedKeys(openedKeys);
  };

  return (
    <Layout className="h-full">
      <Layout.Header className="bg-white p-0 flex items-center shadow-[0_2px_4px_#9999991f] z-10">
        <div
          className="h-full w-[200px] p-[20px] duration-200 transition-all flex items-center"
          style={{
            width: collapsed ? "80px" : "200px",
          }}>
          <img src="/vite.svg" />
          {!collapsed && (
            <span className="text-[#000] ml-[20px] text-[16px] whitespace-nowrap">
              Vite Template
            </span>
          )}
        </div>
        {leftMenus?.length && (
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-[16px] !w-[64px] h-[64px]"
          />
        )}
        <Menu
          mode="horizontal"
          theme="light"
          items={topMenus}
          selectedKeys={[selectedTopKey]}
          onClick={handleClick}
        />
      </Layout.Header>
      <Layout>
        <AnimatePresence>
          {leftMenus?.length && (
            <motion.div
              className="h-full transition-all duration-75"
              initial={{ translateX: "-200px" }}
              animate={{ translateX: "0px" }}
              exit={{ translateX: "-200px" }}>
              <Layout.Sider
                className="!bg-white h-full"
                trigger={null}
                collapsible
                collapsed={collapsed}>
                <Menu
                  theme="light"
                  mode="inline"
                  items={leftMenus}
                  selectedKeys={selectedKeys}
                  openKeys={openedKeys}
                  onClick={handleClick}
                  onOpenChange={handleOpenChange}
                />
              </Layout.Sider>
            </motion.div>
          )}
        </AnimatePresence>
        <Layout.Content className="m-[12px] bg-white rounded-s p-[12px]">
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default App;
