import { CheckOutlined, SettingOutlined } from "@ant-design/icons";
import { MenuModeImg } from "../styles/ThemeSetting.styled";
import { memo, useCallback, useState } from "react";
import { Divider, Drawer, Switch, SwitchProps, Tooltip } from "antd";
import { useThemeStore } from "@/stores/theme";
import IconFont from "@/components/IconFont";
import { MenuModeEnum, ThemeEnum } from "@/enums/appEnums";
import { IconWrapper } from "../styles/IconWrapper.styled";
import { colorPrimaryList } from "@/config/themeConfig";

type ModeItem = { label: string; value: MenuModeEnum };

const ThemeSetting: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const {
    menuMode,
    setMenuMode,
    theme,
    setTheme,
    colorPrimary,
    setColorPrimary,
  } = useThemeStore((state) => ({
    menuMode: state.menuMode,
    setMenuMode: state.setMenuMode,
    theme: state.theme,
    setTheme: state.setTheme,
    colorPrimary: state.colorPrimary,
    setColorPrimary: state.setColorPrimary,
  }));

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
      <IconWrapper onClick={() => setVisible(true)}>
        <SettingOutlined />
      </IconWrapper>

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

        <div className="flex items-center pt-4">
          {colorPrimaryList.map((color) => {
            return (
              <div
                className="w-8 h-8 text-center leading-8 mr-2 cursor-pointer rounded-sm"
                style={{
                  background: color,
                }}
                key={color}
                onClick={() => setColorPrimary(color)}>
                {colorPrimary == color ? (
                  <CheckOutlined className="text-white" />
                ) : null}
              </div>
            );
          })}
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
