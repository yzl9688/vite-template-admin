import { FieldTypeEnum } from "@/enums/formEnums";
import { ReactNode } from "react";

interface IOption {
  label: string;
  value: string | number;
}

/**
 * @description 表单字段基本信息
 */
export interface IField {
  /**
   * 需要渲染的组件
   */
  component: FieldTypeEnum;
  /**
   * 字段名称
   */
  name: string;
  /**
   * 标签文本
   */
  label: string | ReactNode;
  /**
   * 是否必填
   */
  required?: boolean;
  /**
   * 表单字段数据
   */
  options?: IOption[];
}
