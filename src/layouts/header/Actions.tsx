import ThemeSetting from "@/layouts/components/ThemeSetting";
import { useGlobalStore } from "@/stores";
import { FullscreenExitOutlined, FullscreenOutlined, SearchOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, Tooltip } from "antd";
import { memo, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IconWrapper } from "../styles/IconWrapper.styled";
import { useFullScreen } from "@/hooks/useFullScreen";
import { SearchForward, AppSearch } from "../components/search/AppSearch";
import { createPortal } from "react-dom";

const Actions: React.FC = () => {
  const userInfo = useGlobalStore((state) => state.userInfo);
  const reset = useGlobalStore((state) => state.reset);
  const navigate = useNavigate();
  const { isFullscreen, handleToggle } = useFullScreen();
  const searchRef = useRef<SearchForward>(null);

  const items: MenuProps["items"] = [
    {
      label: "退出登录",
      key: "logout",
    },
  ];

  const handleMenuClick = useCallback<Required<MenuProps>["onClick"]>(
    (e) => {
      switch (e.key) {
        case "logout":
          reset();
          navigate("/login");
          break;
      }
    },
    [navigate],
  );

  const handleOpenSearch = () => {
    searchRef.current?.open();
  };

  return (
    <>
      <Tooltip title="搜索">
        <IconWrapper onClick={handleOpenSearch}>
          <SearchOutlined />
        </IconWrapper>
      </Tooltip>

      <Tooltip title={isFullscreen ? "退出全屏" : "全屏"}>
        <IconWrapper onClick={handleToggle}>
          {isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
        </IconWrapper>
      </Tooltip>

      <Dropdown menu={{ items, onClick: handleMenuClick }} placement="bottom" arrow>
        <div className="dark:hover:bg-[rgba(255,255,255,0.12)] hover:bg-[rgba(0,0,0,0.12)] cursor-pointer px-2 overflow-hidden whitespace-nowrap">
          <Avatar size="default" src={<img src={userInfo?.avatar} />} />
          <span className="ml-2">{userInfo?.username}</span>
        </div>
      </Dropdown>

      <ThemeSetting />

      {createPortal(<AppSearch ref={searchRef} />, document.body)}
    </>
  );
};

export default memo(Actions);
