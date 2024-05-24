// import original module declarations
import "styled-components";
import { ThemeEnum } from "./enums/appEnums";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    /**
     * 主题
     */
    themeMode: ThemeEnum;
    /**
     * 顶部导航栏高度
     */
    headerHeight?: number;
    /**
     * 主题色
     */
    colorPrimary?: string;
    /**
     * 背景色
     */
    backgroundColor?: string;
    /**
     * 暗黑模式背景色
     */
    darkBackgroundColor?: string;
  }
}
