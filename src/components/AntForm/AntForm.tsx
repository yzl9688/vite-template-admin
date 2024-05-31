import { IField } from "@/types/form";
import { Button, Form, FormProps } from "antd";
import React, { ReactNode } from "react";
import { AntField } from "./AntField";

export interface AntFormProps extends FormProps {
  fields?: IField[];
  children?: ReactNode;
  mode?: "default" | "query";
  onChange?: (params: object) => void;
}

export const AntForm: React.FC<AntFormProps> = ({
  fields,
  children,
  mode = "query",
  onChange,
  ...args
}) => {
  const [form] = Form.useForm();

  const handleQueryClick = (reset = false) => {
    if (reset) form.resetFields();
    onChange && onChange(form.getFieldsValue());
  };

  const ActionBtns =
    mode == "query" ? (
      <>
        <Form.Item>
          <Button type="primary" onClick={() => handleQueryClick(false)}>
            查询
          </Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={() => handleQueryClick(true)}>重置</Button>
        </Form.Item>
      </>
    ) : null;

  if ((fields || []).length) {
    return (
      <Form form={form} layout={mode == "query" ? "inline" : "horizontal"} {...args}>
        {fields?.map((item) => <AntField key={item.name} {...item} />)}
        {ActionBtns}
      </Form>
    );
  }

  return (
    <Form form={form} layout={mode == "query" ? "inline" : "horizontal"} {...args}>
      {children}
      {ActionBtns}
    </Form>
  );
};
