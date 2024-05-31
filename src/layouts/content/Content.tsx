import { Layout } from "antd";
import useToken from "antd/es/theme/useToken";
import React from "react";
import { Outlet } from "react-router-dom";

const Content: React.FC = () => {
  const [, token] = useToken();

  return (
    <Layout.Content
      id="content-area"
      style={{
        background: token.colorBgLayout,
      }}
      className="p-2 rounded-s overflow-hidden overflow-y-auto">
      <Outlet />
    </Layout.Content>
  );
};

export default Content;
