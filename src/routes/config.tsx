import { BugOutlined, DashboardOutlined } from "@ant-design/icons";
import { IMenu } from "../types/menu";
import CompWrapper from "@/components/CompWrapper";

const menus: IMenu[] = [
  {
    path: "/app/dashboard",
    title: "首页",
    icon: <DashboardOutlined />,
    component: <CompWrapper path="dashboard/Index" />,
  },
  {
    path: "/app/test",
    title: "测试",
    icon: <BugOutlined />,
    children: [
      {
        path: "/app/test/menus",
        title: "菜单组",
        icon: <BugOutlined />,
        children: [
          {
            path: "/app/test/menus/one",
            title: "三级菜单",
            component: <div>三级菜单-1</div>,
          },
          {
            path: "/app/test/menus/two",
            title: "三级菜单",
            component: <div>三级菜单-2</div>,
          },
        ],
      },
      {
        path: "/app/test/link",
        title: "外链测试",
        link: "https://ant.design",
      },
      {
        path: "/app/test/role1",
        title: "role1权限测试",
        roles: ["role1"],
        icon: <BugOutlined />,
        component: <div>role1</div>,
      },
      {
        path: "/app/test/role2",
        title: "role2权限测试",
        roles: ["role2"],
        icon: <BugOutlined />,
        component: <div>role2</div>,
      },
      {
        path: "/app/test/button",
        title: "按钮权限测试",
        permissions: ["add", "edit"],
        component: <CompWrapper path="test/Index" />,
      },
      {
        path: "/app/test/hidden",
        title: "隐藏的菜单",
        hidden: true,
        component: <div>没有菜单的页面</div>,
      },
    ],
  },
  {
    path: "/app/form",
    title: "表单组件",
    component: <div>form</div>,
  },
  {
    path: "/app/form1",
    title: "表单组件1",
    component: <div>form</div>,
  },
];

export default menus;
