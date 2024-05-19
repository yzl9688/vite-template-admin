import { MenuItem } from "@/pages/App";
import { useGlobalStore } from "@/stores";
import { useThemeSetting } from "@/stores/theme";
import { Layout, Menu, MenuProps } from "antd";
import { isArray } from "lodash";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

export const Sider: React.FC<{ menus: MenuItem[] }> = ({ menus }) => {
  const [menuCollapsed, setMenuCollapsed] = useGlobalStore((state) => [
    state.menuCollapsed,
    state.setMenuCollapsed,
  ]);
  const menuMode = useThemeSetting((state) => state.menuMode);

  const [openedKeys, setOpenedKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [_menus, setMenus] = useState<MenuItem[]>([]);

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const topMenu = menus.find(
      (item) =>
        path.indexOf(item?.key) == 0 &&
        ["/", undefined].includes(path[item.key.length]),
    );

    if (topMenu) {
      menuMode == "topLeft" && setMenus(topMenu.children as MenuItem[]);
      menuMode == "left" && setMenus(menus);
      setSelectedKeys([location.pathname]);

      // 获取需要打开的菜单
      const keys = findOpenedKeys(location.pathname, topMenu.children || []);
      // 删除当前菜单的key
      keys.pop();
      setOpenedKeys([topMenu.key, ...keys] || []);
    }
  }, [location, menus]);

  const navigate = useNavigate();

  const handleClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };
  const handleOpenChange: MenuProps["onOpenChange"] = (openedKeys) => {
    setOpenedKeys(openedKeys);
  };

  if (!(_menus || []).length) return <></>;

  return (
    <Layout.Sider
      className="!bg-white h-full"
      trigger={menuMode == "left" ? undefined : null}
      collapsible
      onCollapse={(val) => setMenuCollapsed(val)}
      collapsed={menuCollapsed}>
      {menuMode == "left" && (
        <div
          className="h-[64px] w-[200px] p-[20px] duration-200 transition-all flex items-center shadow-[0_2px_4px_#9999991f] z-10"
          style={{
            width: menuCollapsed ? "80px" : "200px",
          }}>
          <img src="/vite.svg" />
          {!menuCollapsed && (
            <span className="text-[#000] ml-[20px] text-[16px] whitespace-nowrap">
              Vite Template
            </span>
          )}
        </div>
      )}
      <Menu
        className="h-full"
        theme="dark"
        mode="inline"
        items={_menus}
        selectedKeys={selectedKeys}
        openKeys={openedKeys}
        onClick={handleClick}
        onOpenChange={handleOpenChange}
      />
    </Layout.Sider>
  );
};

export default Sider;
