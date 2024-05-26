import { ThemeEnum } from "@/enums/appEnums";
import { useGlobalStore } from "@/stores";
import React from "react";
import { LogoWrapper } from "../styles/AppLogo.styled";
import { useTheme } from "styled-components";

const AppLogo: React.FC<{ theme?: ThemeEnum }> = ({ theme }) => {
  const menuCollapsed = useGlobalStore((state) => state.menuCollapsed);

  const globalTheme = useTheme();

  return (
    <LogoWrapper
      $collapsed={menuCollapsed}
      theme={theme ? { ...globalTheme, themeMode: theme } : undefined}>
      <img src="/vite.svg" />
      {!menuCollapsed && <span>Vite Template</span>}
    </LogoWrapper>
  );
};

export default AppLogo;
