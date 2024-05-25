import ThemeSetting from "@/layouts/components/ThemeSetting";
import { useGlobalStore } from "@/stores";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps } from "antd";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import screenfull from "screenfull";
import { IconWrapper } from "../styles/IconWrapper.styled";

const Actions: React.FC = () => {
  const userInfo = useGlobalStore((state) => state.userInfo);
  const reset = useGlobalStore((state) => state.reset);
  const navigate = useNavigate();

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

  const handleToggle = useCallback(() => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }, []);

  return (
    <>
      <IconWrapper onClick={handleToggle}>
        {screenfull.isFullscreen ? (
          <FullscreenExitOutlined />
        ) : (
          <FullscreenOutlined />
        )}
      </IconWrapper>

      <Dropdown
        menu={{ items, onClick: handleMenuClick }}
        placement="bottom"
        arrow>
        <div className="dark:hover:bg-[rgba(255,255,255,0.12)] hover:bg-[rgba(0,0,0,0.12)] cursor-pointer px-2 overflow-hidden whitespace-nowrap">
          <Avatar size="default" src={<img src={userInfo?.avatar} />} />
          <span className="ml-2">{userInfo?.username}</span>
        </div>
      </Dropdown>

      <ThemeSetting />
    </>
  );
};

export default memo(Actions);
