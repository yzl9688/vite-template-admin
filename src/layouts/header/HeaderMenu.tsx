import { MenuModeEnum } from "@/enums/appEnums";
import { useMenuLocation } from "@/hooks/useMenuLocation";
import { AntMenuItem } from "@/types";
import { Menu, MenuProps } from "antd";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const findTargetMenu: (path: string, menus: AntMenuItem[]) => AntMenuItem | undefined = (
  path,
  menus,
) => {
  const targetMenu = menus.find((item) => item.key == path);

  const findChildMenu: (menus: AntMenuItem[]) => AntMenuItem = (menus) => {
    return menus[0].children?.length ? findChildMenu(menus[0].children) : menus[0];
  };

  if (targetMenu && targetMenu.children?.length) {
    return findChildMenu(targetMenu.children);
  }

  return targetMenu;
};

const HeaderMenu: React.FC<{ menus: AntMenuItem[]; menuMode: MenuModeEnum }> = ({
  menus,
  menuMode,
}) => {
  const { firstMenuKey } = useMenuLocation(menus);
  const navigate = useNavigate();

  const selectedKeys = useMemo(() => {
    return firstMenuKey ? [firstMenuKey] : [];
  }, [firstMenuKey]);

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
    [navigate, menuMode, menus],
  );

  return (
    <Menu
      mode="horizontal"
      className="border-none"
      items={filteredMenus}
      selectedKeys={selectedKeys}
      onClick={handleClick}
    />
  );
};

export default HeaderMenu;
