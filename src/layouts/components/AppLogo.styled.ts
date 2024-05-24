import styled from "styled-components";

export const LogoWrapper = styled.div<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  overflow: hidden;
  height: ${(props) => props.theme.headerHeight + "px"};
  width: ${(props) => (props.$collapsed ? "80px" : "200px")};
  padding: 20px;
  transition: all 0.2s ease-in-out;
  background: transparent;

  > span {
    margin-left: 20px;
    font-size: 16px;
    white-space: nowrap;
    color: ${(props) => (props.theme.themeMode == "dark" ? "#fff" : "#343434")};
  }
`;
