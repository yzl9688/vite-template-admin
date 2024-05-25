import { MenuModeEnum } from "@/enums/appEnums";
import styled from "styled-components";

export const MenuModeImg = styled.div<{
  $mode: MenuModeEnum;
  $selected?: boolean;
}>`
  width: 56px;
  height: 48px;
  background: #f0f2f5;
  box-shadow: 0 1px 2.5px #0000002e;
  margin-right: 20px;
  cursor: pointer;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  border: ${(props) => (props.$selected ? "2px solid #0960bd" : "none")};

  &::before {
    content: "";
    display: ${(props) => (props.$mode == MenuModeEnum.TOP ? "none" : "block")};
    position: absolute;
    height: 100%;
    left: 0;
    width: 33%;
    background: #273352;
    z-index: 9;
  }

  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 25%;
    background: #fff;
    top: 0;
    left: 0;
    z-index: ${(props) => (props.$mode == MenuModeEnum.TOP_LEFT ? 10 : 8)};
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.01);
  }
`;
