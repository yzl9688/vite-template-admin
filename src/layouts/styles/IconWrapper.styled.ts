import { ThemeEnum } from "@/enums/appEnums";
import styled from "styled-components";

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  color: ${(props) => (props.theme.themeMode == ThemeEnum.LIGHT ? "rgba(0 0 0 / 85%)" : "#fff")};
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: ${(props) =>
      props.theme.themeMode == ThemeEnum.LIGHT
        ? "rgba(0, 0, 0, 0.12)"
        : "rgba(255, 255, 255, 0.12)"};
  }
`;
