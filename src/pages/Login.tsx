import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, FormProps, Form, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGlobalStore } from "../stores";

const LeftBg = styled.div`
  content: "";
  position: absolute;
  height: 2000px;
  width: 2000px;
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  background-image: linear-gradient(-45deg, #4481eb 0, #04befe 100%);
  transition: 1.8s ease-in-out;
  border-radius: 50%;
  z-index: 6;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  color: #444;
  margin-bottom: 40px;
  text-align: center;
`;

const inputStyle = `
  height: 55px;
  width: 380px;
  background-color: #f0f0f0!important;
  border-radius: 55px;
  font-size: 18px;
  padding-left: 20px;

  span {
    margin-right: 10px;
    color: #acacac;
  }

  &:focus-within, &:hover {
    background-color: #f0f0f0;
  }
`;

const LargeInput = styled(Input)`
  ${inputStyle}
`;

const LargeInputPas = styled(Input.Password)`
  ${inputStyle}
`;

const LoginBtn = styled(Button)`
  display: block;
  width: 150px;
  height: 50px;
  border-radius: 50px;
  background-color: #5995fd;
  color: #fff;
  font-size: 18px;
`;

interface FieldType {
  username?: string;
  password?: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const setToken = useGlobalStore((state) => state.setToken);

  const handleSubmit: FormProps<FieldType>["onFinish"] = (values) => {
    console.log(values);
    message.success("登录成功");

    setToken("default token");

    navigate("/");
  };

  return (
    <div className="w-full h-full relative">
      <LeftBg />
      <div className="pt-[300px] w-[50%] float-right">
        <Title>Welcome</Title>
        <Form onFinish={handleSubmit} className="flex flex-col items-center">
          <Form.Item
            name="username"
            rules={[{ required: true, message: "用户名不能为空" }]}>
            <LargeInput placeholder="用户名" prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "密码不能为空" }]}>
            <LargeInputPas placeholder="密码" prefix={<LockOutlined />} />
          </Form.Item>
          <LoginBtn type="primary" htmlType="submit">
            登录
          </LoginBtn>
        </Form>
      </div>
    </div>
  );
};

export default Login;
