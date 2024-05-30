import { AntTable } from "@/components/AntTable";
import { FieldTypeEnum } from "@/enums/formEnums";
import { RequestEnum } from "@/enums/httpEnums";
import { IField } from "@/types/form";
import { Card, TableProps } from "antd";
import React from "react";

const TableExample: React.FC = () => {
  const columns: TableProps["columns"] = [
    { title: "姓名", dataIndex: "name" },
    { title: "角色", dataIndex: "role" },
    { title: "邮箱", dataIndex: "email" },
    { title: "姓别", dataIndex: "sex" },
    { title: "年龄", dataIndex: "age" },
  ];

  const fields: IField[] = [
    { name: "name", label: "姓名", component: FieldTypeEnum.INPUT },
    {
      name: "sex",
      label: "姓别",
      component: FieldTypeEnum.SELECT,
      options: [
        { label: "男", value: "male" },
        { label: "女", value: "female" },
      ],
    },
  ];

  return (
    <Card title="表格">
      <AntTable
        fields={fields}
        requestParams={{
          url: "/staffList",
          method: RequestEnum.POST,
          params: {
            sex: "male",
          },
        }}
        columns={columns}
        rowKey="id"
      />
    </Card>
  );
};

export default TableExample;
