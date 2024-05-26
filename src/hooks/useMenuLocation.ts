import { MenuItem } from "@/pages/App";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

// 查找一级菜单
const findFirstLevelMenu: (
  path: string,
  menus: MenuItem[],
) => MenuItem | undefined = (path, menus) => {
  const menu = menus.find(
    (item) =>
      path.indexOf(item?.key) == 0 &&
      ["/", undefined].includes(path[item.key.length]),
  );

  return menu;
};

export const useMenuLocation = (menus: MenuItem[]) => {
  const location = useLocation();

  const firstMenu = useMemo(() => {
    return findFirstLevelMenu(location.pathname, menus);
  }, [menus, location.pathname]);

  const firstMenuKey = useMemo(() => firstMenu?.key, [firstMenu]);

  return {
    firstMenu,
    firstMenuKey,
    location,
  };
};
