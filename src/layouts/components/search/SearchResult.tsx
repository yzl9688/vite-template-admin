import IconFont from "@/components/IconFont";
import { SearchItem } from "@/layouts/styles/AppSearch.styled";
import { IMenu } from "@/types";
import { EnterOutlined } from "@ant-design/icons";
import { isString } from "lodash";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SearchItem {
  path: string;
  icon?: React.ReactNode;
  title: string;
}

const flatMenus = (menus: IMenu[], parentMenu?: SearchItem) => {
  const res: SearchItem[] = [];

  menus.forEach((item) => {
    const searchItem: SearchItem = {
      path: item.path,
      icon: parentMenu?.icon || (isString(item.icon) ? <IconFont type={item.icon} /> : item.icon),
      title: parentMenu ? parentMenu.title + " > " + item.title : item.title || "",
    };
    if ((item?.children || []).length) {
      res.push(...flatMenus(item.children || [], searchItem));
    } else {
      res.push(searchItem);
    }
  });

  return res;
};

export const SearchResult: React.FC<{ keyword: string; menus: IMenu[]; onClose: () => void }> = ({
  keyword,
  menus = [],
  onClose,
}) => {
  const searchList = useMemo(() => {
    return flatMenus(menus);
  }, [menus]);
  const [selectedPath, setSelectedPath] = useState("");
  const selectedPathRef = useRef(selectedPath);
  const searchListRef = useRef(searchList);

  const navigate = useNavigate();

  useEffect(() => {
    selectedPathRef.current = selectedPath;
  }, [selectedPath]);

  useEffect(() => {
    searchListRef.current = searchList;
    if (searchList.length) {
      if (!selectedPathRef.current) setSelectedPath(searchList[0].path);
    } else {
      setSelectedPath("");
    }
  }, [searchList]);

  const moveSelected = (arrow: "down" | "up") => {
    const idx = searchListRef.current.findIndex((item) => item.path == selectedPathRef.current);

    if (arrow == "up" && idx == 0) return;
    if (arrow == "down" && idx == searchListRef.current.length - 1) return;
    const targetItem = searchListRef.current[arrow == "down" ? idx + 1 : idx - 1];

    if (targetItem) setSelectedPath(targetItem.path);
  };

  const navigateToPage = () => {
    if (selectedPathRef.current) navigate(selectedPathRef.current);
    onClose();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Escape":
        onClose();
        break;
      case "ArrowDown":
        moveSelected("down");
        break;
      case "ArrowUp":
        moveSelected("up");
        break;
      case "Enter":
        navigateToPage();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="px-3 py-4 max-h-[400px] overflow-y-auto">
      {menus.length == 0 && (
        <div className="text-center py-10 text-base text-gray-500">暂无搜索结果</div>
      )}
      {searchList.map((item) => (
        <SearchItem
          key={item.path}
          $selected={item.path == selectedPath}
          onClick={navigateToPage}
          onMouseEnter={() => setSelectedPath(item.path)}>
          {item.icon}
          <div
            className="flex-1"
            dangerouslySetInnerHTML={{
              __html: item.title.replace(
                new RegExp(keyword, "g"),
                `<span class="highlight">${keyword}</span>`,
              ),
            }}></div>
          <EnterOutlined />
        </SearchItem>
      ))}
    </div>
  );
};
