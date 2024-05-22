import { SettingOutlined } from "@ant-design/icons";
import { MenuModeImg, SettingBtn } from "./ThemeSetting.styled";
import { memo, useState } from "react";
import { Divider, Drawer, Tooltip } from "antd";
import { MenuMode, useThemeSetting } from "@/stores/theme";

type ModeItem = { label: string; value: MenuMode };

const ThemeSetting: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const menuMode = useThemeSetting((state) => state.menuMode);
  const setMenuMode = useThemeSetting((state) => state.setMenuMode);

  const modeList: ModeItem[] = [
    { label: "顶部菜单模式", value: "top" },
    { label: "左侧菜单模式", value: "left" },
    { label: "顶部左侧菜单联动模式", value: "topLeft" },
  ];

  return (
    <>
      <SettingBtn onClick={() => setVisible(true)}>
        <SettingOutlined />
      </SettingBtn>

      <Drawer title="主题设置" open={visible} onClose={() => setVisible(false)}>
        <Divider>菜单布局</Divider>
        <div className="flex items-center">
          {modeList.map((item) => (
            <Tooltip key={item.value} placement="bottom" title={item.label}>
              <MenuModeImg
                mode={item.value}
                selected={menuMode == item.value}
                onClick={() => setMenuMode(item.value)}
              />
            </Tooltip>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default memo(ThemeSetting);