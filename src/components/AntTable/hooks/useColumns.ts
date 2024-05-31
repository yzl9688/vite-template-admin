import { ColumnInfo, useTableStore } from "@/stores/table";
import { TableColumnsType, TableProps } from "antd";
import { isEqualWith, sortBy } from "lodash";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

type TableColumns = Required<TableProps>["columns"];

function compareColumns(objValue: string[], othValue: string[]) {
  return objValue.every((val) => othValue.includes(val));
}

// 生成column的配置
function generateColumns(columns: TableColumnsType, columnsConfig: ColumnInfo[]): ColumnInfo[] {
  return columns.map((item, index) => {
    const configColumn = columnsConfig.find((c) => c.name == item.title);

    return {
      name: item.title as string,
      sort: configColumn?.sort || index + 1,
      fixed: item?.fixed as "left" | "right",
      hidden: item?.hidden || false,
    };
  });
}

export const useColumns: (columns: TableColumns) => {
  filteredColumns: TableColumns;
} = (columns: TableColumns) => {
  const location = useLocation();
  const columnsConfig = useTableStore((state) => state.getColumns(location.pathname));
  const setColumnsConfig = useTableStore((state) => state.updateColumns);

  // 检查columns是否有变动，有则同步
  if (
    columnsConfig.length !== columns.length ||
    !isEqualWith(
      columns.map((item) => item.title),
      columnsConfig.map((item) => item.name),
      compareColumns,
    )
  ) {
    const transformedColumns = generateColumns(columns, columnsConfig);
    setColumnsConfig(location.pathname, transformedColumns);
  }

  const filteredColumns = useMemo(() => {
    return sortBy(
      columns.map((column) => {
        const columnConfig = columnsConfig.find((item) => item.name == column.title);

        return {
          ...column,
          hidden: columnConfig?.hidden || false,
          fixed: columnConfig?.fixed,
          sort: columnConfig?.sort,
        };
      }),
      (column) => {
        const sort = column.sort;
        delete column.sort;
        return sort;
      },
    );
  }, [columnsConfig, columns]);

  return {
    filteredColumns,
  };
};
