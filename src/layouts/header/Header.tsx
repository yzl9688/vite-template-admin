import { useGlobalStore } from "@/stores";
import { useThemeSetting } from "@/stores/theme";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import Actions from "./Actions";
import { MenuItem } from "@/pages/App";
import { memo, useCallback, useMemo } from "react";

const findTargetMenu: (
  path: string,
  menus: MenuItem[],
) => MenuItem | undefined = (path, menus) => {
  const targetMenu = menus.find((item) => item.key == path);

  const findChildMenu: (menus: MenuItem[]) => MenuItem = (menus) => {
    return menus[0].children?.length
      ? findChildMenu(menus[0].children)
      : menus[0];
  };

  if (targetMenu && targetMenu.children?.length) {
    return findChildMenu(targetMenu.children);
  }

  return targetMenu;
};

const Header: React.FC<{ menus: MenuItem[]; firstMenu?: MenuItem }> = ({
  menus,
  firstMenu,
}) => {
  const menuCollapsed = useGlobalStore((state) => state.menuCollapsed);
  const setMenuCollapsed = useGlobalStore((state) => state.setMenuCollapsed);
  const menuMode = useThemeSetting((state) => state.menuMode);
  const navigate = useNavigate();

  const handleMenuCollapseToggle = useCallback(() => {
    setMenuCollapsed(!menuCollapsed);
  }, [menuCollapsed]);

  const selectedKeys = useMemo(() => {
    return firstMenu ? [firstMenu.key] : [];
  }, [firstMenu]);

  const filteredMenus = useMemo(() => {
    if (menuMode == "topLeft") {
      return menus.map((item) => ({ ...item, children: undefined }));
    }
    return menus;
  }, [menus, menuMode]);

  const handleClick = useCallback<Required<MenuProps>["onClick"]>(
    (e) => {
      if (menuMode == "top") return navigate(e.key);
      const targetMenu = findTargetMenu(e.key, menus);
      navigate(targetMenu?.key || "");
    },
    [navigate, menuMode],
  );

  return (
    <Layout.Header className="bg-white p-0 flex items-center shadow-[0_2px_4px_#9999991f] z-10">
      {menuMode !== "left" && (
        <div
          className="h-full w-[200px] p-[20px] duration-200 transition-all flex items-center"
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
      {menuMode == "left" && (
        <Button
          type="text"
          icon={menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={handleMenuCollapseToggle}
          className="text-[16px] !w-[64px] h-[64px]"
        />
      )}
      <div className="flex-1">
        {menuMode !== "left" && (
          <Menu
            mode="horizontal"
            theme="light"
            items={filteredMenus}
            selectedKeys={selectedKeys}
            onClick={handleClick}
          />
        )}
      </div>
      <Actions />
    </Layout.Header>
  );
};

export default memo(Header);
