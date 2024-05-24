import ThemeSetting from "@/layouts/setting/ThemeSetting";
import { useGlobalStore } from "@/stores";
import { Avatar, Dropdown, MenuProps } from "antd";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

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

  return (
    <>
      <Dropdown
        menu={{ items, onClick: handleMenuClick }}
        placement="bottom"
        arrow>
        <div className="dark:hover:bg-[rgba(255,255,255,0.12)] hover:bg-[rgba(0,0,0,0.12)] cursor-pointer px-2 overflow-hidden whitespace-nowrap">
          <Avatar size="large" src={<img src={userInfo?.avatar} />} />
          <span className="ml-2">{userInfo?.username}</span>
        </div>
      </Dropdown>
      <ThemeSetting />
    </>
  );
};

export default memo(Actions);
