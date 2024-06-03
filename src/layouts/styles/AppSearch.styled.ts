import styled from "styled-components";

export const SearchFooter = styled.div`
  height: 44px;
  line-height: 44px;
  padding: 0 16px;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;

  .iconbox {
    width: 20px;
    height: 18px;
    border-radius: 2px;
    box-shadow:
      inset 0 -2px #cdcde6,
      inset 0 0 1px 1px #fff,
      0 1px 2px 1px #1e235a66;
    margin-right: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }

  > span {
    font-size: 12px;
    margin-right: 16px;
  }
`;

export const SearchItem = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  box-shadow: 0 1px 3px #d4d9e1;
  background: ${(props) => (props.$selected ? props.theme.colorPrimary : "#fff")};
  padding-left: 14px;
  border-radius: 4px;
  color: ${(props) => (props.$selected ? "#fff" : "rgba(0 0 0 / 85%)")};
  margin-bottom: 8px;
  height: 56px;
  line-height: 56px;
  cursor: pointer;
  font-size: 14px;

  .highlight {
    color: hsl(from ${(props) => props.theme.colorPrimary} h s calc(l + 20));
  }

  > .anticon {
    margin-right: 10px;

    &:last-child {
      display: ${(props) => (props.$selected ? "block" : "none")};
    }
  }
`;

export const SearchModal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);

  > .search-box {
    width: 632px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 25px 50px -12px #00000040;
    margin: 50px auto;
    overflow: hidden;
  }

  &.modal {
    &-enter {
      opacity: 0;
    }
    &-enter-active {
      opacity: 1;
      transition: opacity 500ms;
    }
    &-exit {
      opacity: 1;
    }
    &-exit-active {
      opacity: 0;
      transition: opacity 500ms;

      > .search-box {
        scale: 1.2;
        transition: scale 300ms;
      }
    }
  }
`;
