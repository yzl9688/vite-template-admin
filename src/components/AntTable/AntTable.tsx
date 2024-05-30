import { useAntTable } from "@/hooks/useAntTable";
import { RequestParams } from "@/types";
import { IField } from "@/types/form";
import { Table, TableProps } from "antd";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import { AntFormProps, AntForm } from "../AntForm";
import { SettingColumns } from "./components/SettingColumns";
import { useColumns } from "./hooks/useColumns";

export interface AntTableProps extends TableProps {
  requestParams: RequestParams;
  columns: Required<TableProps>["columns"];
  fields?: IField[];
}

interface ForwardProps {
  setRequestParams: (prams: object) => void;
}
export const InnerTable = forwardRef<ForwardProps, AntTableProps>(
  ({ requestParams, columns, ...args }, ref) => {
    const { tableProps, setRequestParams } = useAntTable(requestParams, args);
    const { filteredColumns } = useColumns(columns);

    // 对外抛出修改请求参数的方法
    useImperativeHandle(ref, () => {
      return {
        setRequestParams,
      };
    });

    return <Table columns={filteredColumns} {...tableProps} />;
  },
);

export const AntTable: React.FC<AntTableProps> = ({
  requestParams,
  columns,
  fields,
  ...args
}) => {
  const innerTableRef = useRef<ForwardProps>(null);
  const handleChange: AntFormProps["onChange"] = useCallback(
    (values: object) => {
      innerTableRef.current?.setRequestParams(values);
    },
    [],
  );

  return (
    <div>
      {(fields || []).length && (
        <div className="mb-4 pr-2 flex">
          <AntForm
            className="flex-1"
            fields={fields}
            initialValues={requestParams.params}
            onChange={handleChange}
          />
          <SettingColumns />
        </div>
      )}
      <InnerTable
        ref={innerTableRef}
        requestParams={requestParams}
        columns={columns}
        fields={fields}
        {...args}
      />
    </div>
  );
};
