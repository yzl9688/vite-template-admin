import { SearchFooter, SearchModal } from "@/layouts/styles/AppSearch.styled";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  EnterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, InputRef } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { SearchResult } from "./SearchResult";
import { InputProps } from "antd/lib";
import { IMenu } from "@/types";
import { useGlobalStore } from "@/stores";
import { cloneDeep, isEmpty } from "lodash";
import menus from "@/routes/config";
import IconFont from "@/components/IconFont";

export interface SearchForward {
  open: () => void;
}

const findMenusByKeyword = (keyword: string, menus: IMenu[]) => {
  if (isEmpty(keyword)) return [];
  return menus.filter((item) => {
    if ((item.children || []).length)
      item.children = findMenusByKeyword(keyword, item.children || []);

    if ((item.children || []).length) return true;

    return item.title?.includes(keyword);
  });
};

export const AppSearch = forwardRef<SearchForward>((_props, ref) => {
  const [visible, setVisible] = useState(false);
  const nodeRef = useRef(null);
  const inputRef = useRef<InputRef>(null);
  const [keyword, setKeyword] = useState("");
  const remoteMenus = useGlobalStore((state) => state.menus);

  const searchMenus = useMemo(() => {
    return findMenusByKeyword(keyword.trim(), [...cloneDeep(menus), ...cloneDeep(remoteMenus)]);
  }, [keyword, remoteMenus]);

  const open = () => {
    setVisible(true);
  };
  const close = () => {
    setKeyword("");
    setVisible(false);
  };

  useEffect(() => {
    if (visible) {
      inputRef.current?.focus();
    }
  }, [visible]);

  const handleKeywordChange: InputProps["onChange"] = (e) => {
    setKeyword(e.target.value);
  };

  useImperativeHandle(ref, () => {
    return {
      open,
    };
  });

  return (
    <CSSTransition in={visible} timeout={300} nodeRef={nodeRef} classNames="modal" unmountOnExit>
      <SearchModal ref={nodeRef} onClick={close}>
        <div className="search-box" onClick={(e) => e.stopPropagation()}>
          <div className="px-3 pt-3">
            <Input
              ref={inputRef}
              value={keyword}
              placeholder="搜索"
              size="large"
              onChange={handleKeywordChange}
              prefix={<SearchOutlined className="text-gray-500" />}
            />
          </div>
          <SearchResult keyword={keyword} menus={searchMenus} onClose={close} />
          <SearchFooter>
            <div className="iconbox">
              <EnterOutlined />
            </div>
            <span>确认</span>
            <div className="iconbox">
              <ArrowUpOutlined />
            </div>
            <div className="iconbox">
              <ArrowDownOutlined />
            </div>
            <span>切换</span>
            <div className="iconbox !text-base">
              <IconFont type="icon-ESC" />
            </div>
            <span>关闭</span>
          </SearchFooter>
        </div>
      </SearchModal>
    </CSSTransition>
  );
});
