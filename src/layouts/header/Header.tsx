import { useGlobalStore } from "@/stores";
import { useThemeSetting } from "@/stores/theme";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Actions from "./Actions";
import { MenuItem } from "@/pages/App";
import { memo, useEffect, useState } from "react";

const Header: React.FC<{ menus: MenuItem[] }> = ({ menus }) => {
  console.log("header rendered");
  const [menuCollapsed, setMenuCollapsed] = useGlobalStore((state) => [
    state.menuCollapsed,
    state.setMenuCollapsed,
  ]);
  const [_menus, setMenus] = useState<MenuItem[]>([]);
  const menuMode = useThemeSetting((state) => state.menuMode);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const topMenu = menus.find(
      (item) =>
        path.indexOf(item?.key) == 0 &&
        ["/", undefined].includes(path[item.key.length]),
    );

    if (topMenu) {
      setSelectedKeys([topMenu.key]);
    } else {
      setSelectedKeys([]);
    }
  }, [location, menus]);

  useEffect(() => {
    if (menuMode == "topLeft") {
      setMenus(menus.map((item) => ({ ...item, children: undefined })));
    } else {
      setMenus(menus);
    }
  }, [menus, menuMode]);

  const handleClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

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
          onClick={() => setMenuCollapsed(!menuCollapsed)}
          className="text-[16px] !w-[64px] h-[64px]"
        />
      )}
      <div className="flex-1">
        {menuMode !== "left" && (
          <Menu
            mode="horizontal"
            theme="light"
            items={_menus}
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
