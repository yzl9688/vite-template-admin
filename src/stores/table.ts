import { sortBy } from "lodash";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface ColumnInfo {
  name: string;
  sort?: number;
  fixed?: "left" | "right" | boolean;
  hidden?: boolean;
}

export interface TableSetting {
  columns: ColumnInfo[];
}

interface State {
  tables: { [prop: string]: TableSetting };
}

interface Action {
  // 获取表格的配置
  getTable: (key: string) => TableSetting | null;
  // 获取表格列的配置
  getColumns: (key: string) => ColumnInfo[];
  // 设置表格的配置
  updateColumns: (key: string, columns: ColumnInfo[]) => void;
  // 更新列的配置
  updateColumn: (key: string, column: ColumnInfo) => void;
  // 更新列的sort
  moveColumnByIndex: (key: string, oldIndex: number, newIndex: number) => void;
  // 重置表格列的配置
  resetColumns: (key: string) => void;
}

export const useTableStore = create<State & Action>()(
  persist(
    immer((set, get) => ({
      tables: {},
      getTable: (key: string) => get().tables[key] || null,
      getColumns: (key: string) => {
        const table = get().tables[key];
        return table?.columns || [];
      },
      updateColumns: (key: string, columns: ColumnInfo[]) =>
        set((state) => {
          const table = state.tables[key];
          if (table) {
            table.columns = columns;
          } else {
            state.tables[key] = { columns };
          }
        }),
      resetColumns: (key: string) =>
        set((state) => {
          const table = state.tables[key];
          const columns = table.columns;
          columns.forEach((item, index) => {
            item.hidden = false;
            item.fixed = false;
            item.sort = index + 1;
          });
        }),
      updateColumn: (key: string, column: ColumnInfo) =>
        set((state) => {
          const table = state.tables[key];
          const columnsConfig = table?.columns || [];
          const columnConfig = columnsConfig.find((item) => item.name == column.name);
          if (columnConfig) Object.assign(columnConfig, column);
        }),
      moveColumnByIndex: (key: string, oldIndex: number, newIndex: number) =>
        set((state) => {
          const table = state.tables[key];
          const columns = table?.columns || [];

          const sortNames = sortBy(
            columns.map((item) => ({
              name: item.name,
              sort: item.sort,
            })),
            "sort",
          ).map((item) => item.name);

          if (oldIndex < newIndex) {
            sortNames.splice(newIndex + 1, 0, sortNames[oldIndex]);
            sortNames.splice(oldIndex, 1);
          } else {
            sortNames.splice(newIndex, 0, sortNames[oldIndex]);
            sortNames.splice(oldIndex + 1, 1);
          }

          columns.forEach((item) => {
            const index = sortNames.indexOf(item.name);
            item.sort = index + 1;
          });
        }),
    })),
    {
      name: "table-setting",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
