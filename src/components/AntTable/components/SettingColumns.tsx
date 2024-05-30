import { useTableStore } from "@/stores/table";
import { SettingOutlined } from "@ant-design/icons";
import { Button, Checkbox, Popover } from "antd";
import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import DraggableColumn from "./DraggableColumn";
import { SortableContext } from "@dnd-kit/sortable";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { cloneDeep, sortBy } from "lodash";
import {
  restrictToFirstScrollableAncestor,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import { CheckboxProps } from "antd/lib";

const PopoverContent: React.FC = () => {
  const location = useLocation();
  const columns = useTableStore((state) => state.getColumns(location.pathname));
  const updateColumns = useTableStore((state) => state.updateColumns);
  const moveColumnByIndex = useTableStore((state) => state.moveColumnByIndex);
  const resetColumns = useTableStore((state) => state.resetColumns);

  // 排序过的columns
  const sortedColumns = useMemo(() => {
    return sortBy(columns, "sort");
  }, [columns]);

  // 是否半选
  const indeterminate = useMemo(() => {
    const checkedLength = columns.filter((item) => !item.hidden).length;
    return checkedLength > 0 && checkedLength < columns.length;
  }, [columns]);

  // 是否全选
  const checkedAll = useMemo(() => {
    const checkedLength = columns.filter((item) => !item.hidden).length;
    return checkedLength == columns.length;
  }, [columns]);

  const handleChangeCheck: CheckboxProps["onChange"] = (e) => {
    const checked = e.target.checked;
    const tempColumns = cloneDeep(columns);
    if (checked) {
      tempColumns.forEach((item) => (item.hidden = false));
    } else {
      tempColumns.forEach((item) => (item.hidden = true));
    }
    updateColumns(location.pathname, tempColumns);
  };

  const handleReset = () => {
    resetColumns(location.pathname);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over?.id && active.id !== over?.id) {
      const oldIndex = sortedColumns.findIndex(
        (item) => item.name == active.id,
      );
      const newIndex = sortedColumns.findIndex((item) => item.name == over.id);

      if (oldIndex == newIndex) return;
      moveColumnByIndex(location.pathname, oldIndex, newIndex);
    }
  };

  return (
    <div>
      <div className="flex items-center w-[300px] mb-4">
        <div className="flex-1">
          <Checkbox
            indeterminate={indeterminate}
            checked={checkedAll}
            onChange={handleChangeCheck}>
            {checkedAll ? "取消全部" : "选中全部"}
          </Checkbox>
        </div>
        <Button type="link" onClick={handleReset}>
          重置
        </Button>
      </div>
      <DndContext
        onDragEnd={handleDragEnd}
        modifiers={[restrictToFirstScrollableAncestor, restrictToVerticalAxis]}>
        <div className="max-h-[200px] overflow-y-auto overflow-x-hidden">
          <SortableContext items={sortedColumns.map((item) => item.name)}>
            {sortedColumns.map((item) => {
              return (
                <DraggableColumn
                  key={item.name}
                  name={item.name}
                  visible={!item.hidden}
                  fixed={item.fixed}
                />
              );
            })}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
};

export const SettingColumns: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Popover
      open={open}
      trigger="click"
      placement="bottomRight"
      arrow={{
        pointAtCenter: true,
      }}
      onOpenChange={handleOpenChange}
      content={<PopoverContent />}>
      <SettingOutlined className="text-lg cursor-pointer hover:text-primary" />
    </Popover>
  );
};
