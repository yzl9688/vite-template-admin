import { Spin } from "antd";
import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="text-center mt-[300px]">
      <Spin size="large"></Spin>
    </div>
  );
};

export default Loading;
