import { useGlobalStore } from "@/stores";
import { useThemeStore } from "@/stores/theme";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import Actions from "./Actions";
import { MenuItem } from "@/pages/App";
import { memo, useCallback, useMemo } from "react";
import { MenuModeEnum } from "@/enums/appEnums";
import AppLogo from "../components/AppLogo";

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
  const menuMode = useThemeStore((state) => state.menuMode);
  const navigate = useNavigate();

  const handleMenuCollapseToggle = useCallback(() => {
    setMenuCollapsed(!menuCollapsed);
  }, [menuCollapsed]);

  const selectedKeys = useMemo(() => {
    return firstMenu ? [firstMenu.key] : [];
  }, [firstMenu]);

  const filteredMenus = useMemo(() => {
    if (menuMode == MenuModeEnum.TOP_LEFT) {
      return menus.map((item) => ({ ...item, children: undefined }));
    }
    return menus;
  }, [menus, menuMode]);

  const handleClick = useCallback<Required<MenuProps>["onClick"]>(
    (e) => {
      if (menuMode == MenuModeEnum.TOP) return navigate(e.key);
      const targetMenu = findTargetMenu(e.key, menus);
      navigate(targetMenu?.key || "");
    },
    [navigate, menuMode],
  );

  return (
    <Layout.Header className="p-0 flex items-center border-b-[rgba(253,253,253,0.12)] border-solid border-b-[1px]">
      {menuMode !== MenuModeEnum.LEFT && <AppLogo />}
      {menuMode == MenuModeEnum.LEFT && (
        <Button
          type="text"
          icon={menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={handleMenuCollapseToggle}
          className="text-[16px] !w-[54px] h-full"
        />
      )}
      <div className="flex-1">
        {menuMode !== MenuModeEnum.LEFT && (
          <Menu
            mode="horizontal"
            className="border-none"
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
