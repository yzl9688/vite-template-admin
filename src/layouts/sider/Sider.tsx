import { MenuModeEnum, ThemeEnum } from "@/enums/appEnums";
import { MenuItem } from "@/pages/App";
import { useGlobalStore } from "@/stores";
import { useThemeStore } from "@/stores/theme";
import { Layout, Menu, MenuProps } from "antd";
import { isArray, uniq } from "lodash";
import { useState, useEffect, useCallback, useMemo, memo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppLogo from "../components/AppLogo";
import { useMenuLocation } from "@/hooks/useMenuLocation";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { Fade } from "@/styles/Fade.styled";

// 获取当前菜单的父级菜单的key
const findOpenedKeys: (path: string, menus: MenuItem[]) => string[] = (path, menus) => {
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
  const menuCollapsed = useGlobalStore((state) => state.menuCollapsed);
  const setMenuCollapsed = useGlobalStore((state) => state.setMenuCollapsed);
  const menuMode = useThemeStore((state) => state.menuMode);
  const { firstMenu } = useMenuLocation(menus);

  const [openedKeys, setOpenedKeys] = useState<string[]>([]);

  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuCollapseToggle = useCallback(() => {
    setMenuCollapsed(!menuCollapsed);
  }, [menuCollapsed]);

  const _menus = useMemo(() => {
    if (menuMode == MenuModeEnum.LEFT) return menus;
    else if (menuMode == MenuModeEnum.TOP_LEFT) {
      return firstMenu ? firstMenu.children : [];
    }
    return [];
  }, [firstMenu, menus]);

  useEffect(() => {
    setTimeout(() => {
      if (firstMenu && !menuCollapsed) {
        // 获取需要打开的菜单
        const keys = findOpenedKeys(location.pathname, firstMenu.children || []);
        // 删除当前菜单的key
        keys.pop();
        setOpenedKeys((prev) => uniq([...prev, firstMenu.key, ...keys]));
      }
    }, 20);
  }, [menus, firstMenu, menuCollapsed]);

  const handleClick = useCallback<Required<MenuProps>["onClick"]>(
    (e) => {
      navigate(e.key);
    },
    [navigate],
  );

  const handleOpenChange = useCallback<Required<MenuProps>["onOpenChange"]>((openedKeys) => {
    setOpenedKeys(openedKeys);
  }, []);

  const nodeRef = useRef(null);

  const InnerMenu = useMemo(() => {
    if (!(_menus || []).length) return <></>;

    return (
      <Fade ref={nodeRef} $onlyFadeIn>
        <Layout.Sider
          className="h-full"
          trigger={menuMode == MenuModeEnum.TOP_LEFT ? undefined : null}
          theme="dark"
          collapsible
          onCollapse={handleMenuCollapseToggle}
          collapsed={menuCollapsed}>
          {menuMode == MenuModeEnum.LEFT && <AppLogo theme={ThemeEnum.DARK} />}
          <Menu
            mode="inline"
            theme="dark"
            items={_menus}
            selectedKeys={[location.pathname]}
            openKeys={openedKeys}
            onClick={handleClick}
            onOpenChange={handleOpenChange}
          />
        </Layout.Sider>
      </Fade>
    );
  }, [_menus, menuMode, menuCollapsed, openedKeys, location]);

  if (menuMode == MenuModeEnum.LEFT) return InnerMenu;

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={firstMenu?.key}
        nodeRef={nodeRef}
        timeout={300}
        classNames="fade"
        appear={true}>
        {InnerMenu}
      </CSSTransition>
    </SwitchTransition>
  );
};

export default memo(Sider);
