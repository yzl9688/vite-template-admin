import { RequestEnum } from "@/enums/httpEnums";
import { useQueryTable } from "@/hooks/useQueryTable";
import {
  Button,
  Card,
  Form,
  FormProps,
  Input,
  Select,
  Table,
  TableProps,
} from "antd";
import React from "react";

const TableExample: React.FC = () => {
  const columns: TableProps["columns"] = [
    { title: "姓名", dataIndex: "name" },
    { title: "角色", dataIndex: "role" },
    { title: "邮箱", dataIndex: "email" },
    { title: "姓别", dataIndex: "sex" },
    { title: "年龄", dataIndex: "age" },
  ];
  const { tableProps, setRequestParams } = useQueryTable(
    {
      url: "/staffList",
      method: RequestEnum.POST,
      params: {
        sex: "male",
      },
    },
    {
      size: "small",
    },
  );
  const [form] = Form.useForm();

  const handleFinish: FormProps["onFinish"] = (values) => {
    setRequestParams(values);
  };
  const handleReset: FormProps["onReset"] = () => {
    const values = form.getFieldsValue();
    setRequestParams(values);
  };

  return (
    <Card title="表格">
      <Form
        layout="inline"
        form={form}
        className="mb-2"
        onFinish={handleFinish}
        onReset={handleReset}>
        <Form.Item name="name" label="姓名">
          <Input />
        </Form.Item>
        <Form.Item name="sex" label="性别">
          <Select
            className="!w-24"
            options={[
              { label: "男", value: "male" },
              { label: "女", value: "female" },
            ]}></Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
        <Form.Item>
          <Button htmlType="reset">重置</Button>
        </Form.Item>
      </Form>
      <Table columns={columns} rowKey="id" {...tableProps} />
    </Card>
  );
};

export default TableExample;
