import React from "react";
import { SettingColumns } from "./SettingColumns";
import { useFullScreen } from "@/hooks/useFullScreen";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

export const Actions: React.FC = () => {
  const element = document.getElementById("content-area");
  const { isFullscreen, handleToggle } = useFullScreen(element || undefined);

  return (
    <div className="flex items-center space-x-2 text-lg cursor-pointer">
      <Tooltip title={isFullscreen ? "退出全屏" : "全屏"}>
        <div className="hover:text-primary" onClick={handleToggle}>
          {isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
        </div>
      </Tooltip>
      <SettingColumns />
    </div>
  );
};
