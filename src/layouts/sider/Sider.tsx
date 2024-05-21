import { MenuItem } from "@/pages/App";
import { useGlobalStore } from "@/stores";
import { useThemeSetting } from "@/stores/theme";
import { Layout, Menu, MenuProps } from "antd";
import { isArray, uniq } from "lodash";
import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// 获取当前菜单的父级菜单的key
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

export const Sider: React.FC<{ menus: MenuItem[]; firstMenu?: MenuItem }> = ({
  menus,
  firstMenu,
}) => {
  const menuCollapsed = useGlobalStore((state) => state.menuCollapsed);
  const setMenuCollapsed = useGlobalStore((state) => state.setMenuCollapsed);
  const menuMode = useThemeSetting((state) => state.menuMode);

  const [openedKeys, setOpenedKeys] = useState<string[]>([]);

  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuCollapseToggle = useCallback(() => {
    setMenuCollapsed(!menuCollapsed);
  }, [menuCollapsed]);

  const _menus = useMemo(() => {
    if (menuMode == "left") return menus;
    else if (menuMode == "topLeft") {
      return firstMenu ? firstMenu.children : [];
    }
    return [];
  }, [firstMenu, menus]);

  useEffect(() => {
    if (firstMenu && !menuCollapsed) {
      // 获取需要打开的菜单
      const keys = findOpenedKeys(location.pathname, firstMenu.children || []);
      // 删除当前菜单的key
      keys.pop();
      setOpenedKeys((prev) => uniq([...prev, firstMenu.key, ...keys]));
    }
  }, [menus, firstMenu]);

  const handleClick = useCallback<Required<MenuProps>["onClick"]>(
    (e) => {
      navigate(e.key);
    },
    [navigate],
  );

  const handleOpenChange = useCallback<Required<MenuProps>["onOpenChange"]>(
    (openedKeys) => {
      setOpenedKeys(openedKeys);
    },
    [],
  );

  if (!(_menus || []).length) return <></>;

  return (
    <Layout.Sider
      className="!bg-white h-full"
      trigger={menuMode == "topLeft" ? undefined : null}
      collapsible
      onCollapse={handleMenuCollapseToggle}
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
        selectedKeys={[location.pathname]}
        openKeys={openedKeys}
        onClick={handleClick}
        onOpenChange={handleOpenChange}
      />
    </Layout.Sider>
  );
};

export default memo(Sider);
