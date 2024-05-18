import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotAuth: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-[200px]">
      <Result
        status="403"
        title="403"
        subTitle="抱歉，您无权访问该页面~"
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
