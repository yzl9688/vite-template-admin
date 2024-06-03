export interface IMenuItem {
  /**
   * 路由路径(path还用作key)
   */
  path: string;
  /**
   * 组件路径或节点
   */
  component?: string | React.ReactNode;
  /**
   * 外链
   */
  link?: string;
  /**
   * 菜单名称
   */
  title?: string;
  /**
   * 菜单icon
   */
  icon?: string | React.ReactNode;
  /**
   * 是否隐藏该菜单
   */
  hidden?: boolean;
  /**
   * 角色权限
   */
  roles?: string[];
  /**
   * 按钮权限
   */
  permissions?: string[];
}

export interface IMenu extends IMenuItem {
  /**
   * 子菜单
   */
  children?: IMenu[];
}

export type AntMenuItem = {
  key: string;
  label?: string;
  icon?: React.ReactNode | string;
  children?: AntMenuItem[];
};
