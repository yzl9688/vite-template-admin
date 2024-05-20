import React, { useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { IMenu } from "@/types/menu";
import { isArray, isString } from "lodash";
import CompWrapper from "@/components/CompWrapper";
import { useGlobalStore } from "@/stores";
import menus from "./config";
import NotAuth from "@/pages/NotAuth";
import App from "@/pages/App";

const ElementWrapper: React.FC<{
  title: string;
  roles?: string[];
  permissions?: string[];
  children: React.ReactNode;
}> = React.memo(({ children, title, roles, permissions }) => {
  const role = useGlobalStore((state) => state.role);
  const setBtnPermissions = useGlobalStore((state) => state.setBtnPermissions);
  if ((roles || []).length && !roles?.includes(role || "")) {
    // 角色鉴权，没有权限则返回403
    return <NotAuth />;
  }

  // 推迟状态更新 防止组件未完成卸载时触发更新
  Promise.resolve().then(() => {
    setBtnPermissions(permissions || []);
  });

  document.title = title;

  return <>{children}</>;
});

// 创建渲染元素
const createElement: (menu: IMenu) => React.ReactNode = (menu) => {
  if (!menu.component) {
    if (menu.link) {
      // 使用iframe打开外链
      return (
        <div className="w-full h-full">
          <iframe className="w-full h-full" src={menu.link} />
        </div>
      );
    }

    console.error(menu.path + "路由未指定component");
    return <div>未指定component属性</div>;
  }

  return isString(menu.component) ? (
    <CompWrapper path={menu.component} />
  ) : (
    menu.component
  );
};

// 创建路由
const createRoute: (menu: IMenu) => React.ReactNode = (menu) => {
  // 路由嵌套过深 多次重定向会导致 依赖location.pathname的钩子多次触发
  // if (isArray(menu.children)) {
  //   return (
  //     <Route path={menu.path} key={menu.path}>
  //       {/* 重写向到子级第一个路由 */}
  //       <Route
  //         index
  //         element={
  //           <Navigate
  //             replace
  //             to={menu.children[0].path}
  //             key={menu.path + "redirect"}
  //           />
  //         }
  //       />
  //       {menu.children.map((item) => createRoute(item))}
  //     </Route>
  //   );
  // }
  if (menu.children?.length) {
    return menu.children.map((item) => createRoute(item));
  }

  const element = createElement(menu);

  return (
    <Route
      path={menu.path}
      element={
        <ElementWrapper
          title={menu.title || ""}
          roles={menu.roles}
          permissions={menu.permissions}>
          {element}
        </ElementWrapper>
      }
      key={menu.path}
    />
  );
};

// 生成路由表
const createRoutes: (menus: IMenu[]) => React.ReactNode[] = (menus) => {
  const routes = menus.map((item: IMenu) => createRoute(item));

  const findChildMenu: (menus: IMenu[]) => IMenu = (menus) => {
    return menus[0].children?.length
      ? findChildMenu(menus[0].children)
      : menus[0];
  };

  menus.length &&
    routes.unshift(
      <Route
        index
        element={<Navigate replace to={findChildMenu(menus).path} />}
        key="redirect"
      />,
    );

  return routes;
};

const AuthWrapper: React.FC<{ to: string; children: React.ReactNode }> = ({
  to,
  children,
}) => {
  const token = useGlobalStore((state) => state.token);

  // 已登录情况不可访问登录页
  if (token && to == "login") {
    return <Navigate replace to="/" />;
  }

  // 未登录情况不可访问应用页
  if (!token && to == "app") {
    return <Navigate replace to="/login" />;
  }

  return <>{children}</>;
};

const MenuRoutes: React.FC = () => {
  const remoteMenus = useGlobalStore((state) => state.menus);

  const routes = useMemo(
    () => createRoutes([...menus, ...remoteMenus]),
    [remoteMenus],
  );

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthWrapper to="app">
            <App />
          </AuthWrapper>
        }>
        {routes}
      </Route>
      <Route
        path="/login"
        element={
          <AuthWrapper to="login">
            <CompWrapper path="Login" />
          </AuthWrapper>
        }
      />
      <Route path="/*" element={<CompWrapper path="NotFound" />} />
    </Routes>
  );
};

export default MenuRoutes;
