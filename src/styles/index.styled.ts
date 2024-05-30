import styled from "styled-components";

export const HoverWrapper = styled.div<{
  $selected?: boolean;
  $color?: string;
}>`
  color: ${(props) =>
    props.$selected
      ? props.theme.colorPrimary
      : props.$color
        ? props.$color
        : "inherit"};

  &:hover {
    color: ${(props) => props.theme.colorPrimary};
  }
`;
