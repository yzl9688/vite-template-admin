import { FieldTypeEnum } from "@/enums/formEnums";
import { IField } from "@/types/form";
import {
  AutoComplete,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TimePicker,
} from "antd";
import React, { memo } from "react";

const RenderComponent: React.FC<Pick<IField, "component" | "options">> = memo(
  ({ component, options, ...args }) => {
    switch (component) {
      case FieldTypeEnum.INPUT:
        return <Input {...args} />;
      case FieldTypeEnum.INPUT_NUMBER:
        return <InputNumber {...args} />;
      case FieldTypeEnum.INPUT_PASSWORD:
        return <Input.Password {...args} />;
      case FieldTypeEnum.INPUT_TEXTAREA:
        return <Input.TextArea {...args} />;
      case FieldTypeEnum.SELECT:
        return <Select options={options} {...args} />;
      case FieldTypeEnum.SELECT_MULTIPLE:
        return <Select options={options} mode="multiple" {...args} />;
      case FieldTypeEnum.RADIO_GROUP:
        return <Radio.Group options={options} {...args} />;
      case FieldTypeEnum.CHECKBOX_GROUP:
        return <Checkbox.Group options={options} {...args} />;
      case FieldTypeEnum.DATEPICKER:
        return <DatePicker {...args} />;
      case FieldTypeEnum.DATEPICKER_RANGE:
        return <DatePicker.RangePicker {...args} />;
      case FieldTypeEnum.TIMEPICKER:
        return <TimePicker {...args} />;
      case FieldTypeEnum.TIMEPICKER_RANGE:
        return <TimePicker.RangePicker {...args} />;
      case FieldTypeEnum.SWITCH:
        return <Switch {...args} />;
      case FieldTypeEnum.CASCADER:
        return <Cascader options={options} {...args} />;
      case FieldTypeEnum.AUTOCOMPLETE:
        return <AutoComplete options={options} {...args} />;
    }
  },
);

export const AntField: React.FC<IField> = ({ component, name, label, required, options }) => {
  return (
    <Form.Item
      name={name}
      label={label}
      required={required}
      rules={required ? [{ message: `${label}不能为空`, required: true }] : undefined}>
      <RenderComponent component={component} options={options} />
    </Form.Item>
  );
};

export default AntField;
