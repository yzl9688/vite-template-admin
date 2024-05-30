import { useTableStore } from "@/stores/table";
import { DragOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import { Checkbox, CheckboxProps, Divider, Tooltip } from "antd";
import { useLocation } from "react-router-dom";
import { memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { HoverWrapper } from "@/styles/index.styled";

const DraggableColumn: React.FC<{
  name: string;
  visible: boolean;
  fixed?: "left" | "right" | boolean;
}> = memo(({ name, visible, fixed }) => {
  const updateColumnConfig = useTableStore((state) => state.updateColumn);
  const location = useLocation();

  const handleChange: CheckboxProps["onChange"] = (e) => {
    const checked = e.target.checked;
    updateColumnConfig(location.pathname, {
      name,
      hidden: !checked,
    });
  };

  const handleChangeFixed = (direction: "left" | "right") => {
    updateColumnConfig(location.pathname, {
      name,
      fixed: fixed == direction ? false : direction,
    });
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-full mb-2 flex items-center pr-4"
      {...attributes}>
      <DragOutlined {...listeners} className="mr-2 text-sm" />
      <Checkbox checked={visible} onChange={handleChange}>
        {name}
      </Checkbox>
      <div className="flex-1"></div>
      <Tooltip title="固定到左侧">
        <HoverWrapper $selected={fixed == "left"}>
          <VerticalAlignBottomOutlined
            className="rotate-90 text-sm"
            onClick={() => handleChangeFixed("left")}
          />
        </HoverWrapper>
      </Tooltip>
      <Divider type="vertical" className="mx-2" />
      <Tooltip title="固定到右侧">
        <HoverWrapper $selected={fixed == "right"}>
          <VerticalAlignBottomOutlined
            className="-rotate-90 text-sm"
            onClick={() => handleChangeFixed("right")}
          />
        </HoverWrapper>
      </Tooltip>
    </div>
  );
});

export default DraggableColumn;
