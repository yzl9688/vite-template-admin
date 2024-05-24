import { ThemeEnum } from "@/enums/appEnums";
import { useGlobalStore } from "@/stores";
import React from "react";
import { LogoWrapper } from "./AppLogo.styled";

const AppLogo: React.FC<{ theme?: ThemeEnum }> = ({ theme }) => {
  const menuCollapsed = useGlobalStore((state) => state.menuCollapsed);

  return (
    <LogoWrapper
      $collapsed={menuCollapsed}
      theme={theme ? { themeMode: theme } : undefined}>
      <img src="/vite.svg" />
      {!menuCollapsed && <span>Vite Template</span>}
    </LogoWrapper>
  );
};

export default AppLogo;
