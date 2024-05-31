import { useGlobalStore } from "@/stores";
import { useThemeStore } from "@/stores/theme";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import Actions from "./Actions";
import { MenuItem } from "@/pages/App";
import { memo, useCallback } from "react";
import { MenuModeEnum } from "@/enums/appEnums";
import AppLogo from "../components/AppLogo";
import HeaderMenu from "./HeaderMenu.tsx";

const Header: React.FC<{ menus: MenuItem[] }> = ({ menus }) => {
  const menuCollapsed = useGlobalStore((state) => state.menuCollapsed);
  const setMenuCollapsed = useGlobalStore((state) => state.setMenuCollapsed);
  const menuMode = useThemeStore((state) => state.menuMode);

  const handleMenuCollapseToggle = useCallback(() => {
    setMenuCollapsed(!menuCollapsed);
  }, [menuCollapsed]);

  return (
    <Layout.Header className="flex items-center border-b-[rgba(253,253,253,0.12)] border-solid border-b-[1px]">
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
        {menuMode !== MenuModeEnum.LEFT && <HeaderMenu menus={menus} menuMode={menuMode} />}
      </div>
      <Actions />
    </Layout.Header>
  );
};

export default memo(Header);
