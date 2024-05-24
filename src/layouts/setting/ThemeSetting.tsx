import { SettingOutlined } from "@ant-design/icons";
import { MenuModeImg, SettingBtn } from "./ThemeSetting.styled";
import { memo, useCallback, useState } from "react";
import { Divider, Drawer, Switch, SwitchProps, Tooltip } from "antd";
import { useThemeStore } from "@/stores/theme";
import IconFont from "@/components/IconFont";
import { MenuModeEnum, ThemeEnum } from "@/enums/appEnums";

type ModeItem = { label: string; value: MenuModeEnum };

const ThemeSetting: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const menuMode = useThemeStore((state) => state.menuMode);
  const setMenuMode = useThemeStore((state) => state.setMenuMode);
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const modeList: ModeItem[] = [
    { label: "顶部菜单模式", value: MenuModeEnum.TOP },
    { label: "左侧菜单模式", value: MenuModeEnum.LEFT },
    { label: "顶部左侧菜单联动模式", value: MenuModeEnum.TOP_LEFT },
  ];

  const handleThemeChange = useCallback<Required<SwitchProps>["onChange"]>(
    (e) => {
      if (e) {
        setTheme(ThemeEnum.DARK);
      } else {
        setTheme(ThemeEnum.LIGHT);
      }
    },
    [],
  );

  return (
    <>
      <SettingBtn onClick={() => setVisible(true)}>
        <SettingOutlined />
      </SettingBtn>

      <Drawer title="主题设置" open={visible} onClose={() => setVisible(false)}>
        <Divider>主题</Divider>
        <div className="text-center">
          <Switch
            size="default"
            checked={theme == ThemeEnum.DARK}
            checkedChildren={<IconFont type="icon-sun" />}
            unCheckedChildren={<IconFont type="icon-moon" />}
            onChange={handleThemeChange}
          />
        </div>

        <Divider>菜单布局</Divider>
        <div className="flex items-center">
          {modeList.map((item) => (
            <Tooltip key={item.value} placement="bottom" title={item.label}>
              <MenuModeImg
                $mode={item.value}
                $selected={menuMode == item.value}
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
