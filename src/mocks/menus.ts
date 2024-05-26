import { IMenu } from "@/types/menu";

export const menus: IMenu[] = [
  {
    path: "/map",
    title: "地图",
    component: "map/Index",
  },
  {
    path: "/components",
    title: "组件示例",
    icon: "icon-yewutubiao_zujian-shujuluruzujian",
    children: [
      {
        path: "/components/table",
        title: "表格",
        component: "component-example/table/Table",
      },
    ],
  },
];
