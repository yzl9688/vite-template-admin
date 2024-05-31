import styled from "styled-components";

export const Fade = styled.div<{ $onlyFadeIn?: boolean }>`
  &.fade {
    &-enter-active,
    &-appear-active,
    &-exit-active {
      transition: all 500ms;
    }

    &-enter,
    &-appear {
      opacity: 0;
      transform: translateX(-30px);
    }

    &-enter-active,
    &-appear-active {
      opacity: 1;
      transform: translateX(0px);
    }

    &-exit {
      opacity: 1;
      transform: translateX(0px);
    }

    &-exit-active {
      opacity: 0;
      ${(props) => (props.$onlyFadeIn ? "" : "transform: translateX(30px)")};
    }
  }
`;
