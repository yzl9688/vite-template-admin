import { useGlobalStore } from "@/stores";
import { Button, Result } from "antd";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const NotAuth: React.FC = () => {
  const navigate = useNavigate();
  const token = useGlobalStore((state) => state.token);

  if (!token) return <Navigate to="/login" />;

  return (
    <div className="pt-[200px]">
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在~"
        extra={
          <Button
            type="primary"
            onClick={() => {
              navigate("/");
            }}>
            返回首页
          </Button>
        }
      />
    </div>
  );
};

export default NotAuth;
