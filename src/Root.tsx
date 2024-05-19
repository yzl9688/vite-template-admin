import { BrowserRouter } from "react-router-dom";
import React from "react";
import MenuRoutes from "./routes";
import { ConfigProvider } from "antd";

const Root: React.FC = () => {
  // 可以在此处获取远程的菜单

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#23ccef",
        },
      }}>
      <div className="bg-[#fcfcfa] h-[100vh] overflow-hidden">
        <BrowserRouter basename="/">
          <MenuRoutes />
        </BrowserRouter>
      </div>
    </ConfigProvider>
  );
};

export default Root;
