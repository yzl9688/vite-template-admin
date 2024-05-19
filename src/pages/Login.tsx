import { Button, Input, FormProps, Form, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGlobalStore } from "../stores";
import FullScreenBg from "../assets/full-screen-bg.jpeg";
import { motion } from "framer-motion";

const BgContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${FullScreenBg});
  background-size: cover;
  background-position: 50%;
  overflow: hidden;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: 0.33;
    background: #000;
    z-index: 2;
  }
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, #292929 0, #0e0e0e);
    background-size: 150% 150%;
    z-index: 3;
    opacity: 0.55;
  }
`;

const LoginCard = styled.div`
  width: 300px;
  box-shadow: 0 25px 30px -13px rgba(40, 40, 40, 0.4);
  border-radius: 10px;
  padding: 30px 15px;
  background: #fff;
  margin: 0 auto;
  margin-top: 300px;
  position: relative;
  z-index: 9;
`;

const TopTitle = styled.h1`
  color: #fff;
  font-size: 18px;
  font-weight: 400;
  position: absolute;
  left: 100px;
  top: 30px;
  z-index: 9;
`;

const Title = styled.h1`
  font-size: 28px;
  color: #333;
  font-weight: 300;
  text-align: center;
  margin-bottom: 20px;
`;

const FormWrapper = styled(Form)`
  .ant-form-item {
    width: 100%;

    &-label {
      padding-bottom: 5px;
      label {
        color: #9a9a9a;
      }
    }
  }
`;

const inputStyle = `
  width: 100% !important;
  background-color: #fff!important;
  border-radius: 4px;
  font-size: 18px;
  border: 1px solid #e3e3e3;

  &:focus-within, &:hover {
    background-color: #fff;
  }
`;

const LargeInput = styled(Input)`
  ${inputStyle}
`;

const LargeInputPas = styled(Input.Password)`
  ${inputStyle}
`;

const LoginBtn = styled(Button)`
  min-width: 180px;
  display: block;
  border-radius: 30px;
  color: #fff;
  font-size: 14px;
  line-height: 14px;
  padding: 8px 16px;
`;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const setToken = useGlobalStore((state) => state.setToken);

  const handleSubmit: FormProps["onFinish"] = (values) => {
    console.log(values);
    message.success("登录成功");

    setToken("default token");

    navigate("/");
  };

  return (
    <BgContainer>
      <TopTitle>Vite template admin</TopTitle>
      <motion.div
        className="relative z-10"
        transition={{
          ease: "linear",
          duration: 0.2,
        }}
        initial={{
          translateY: "-150px",
          opacity: 0,
        }}
        animate={{
          translateY: "0px",
          opacity: 1,
        }}>
        <LoginCard>
          <Title>Login</Title>

          <FormWrapper
            onFinish={handleSubmit}
            layout="vertical"
            className="flex flex-col items-center">
            <Form.Item
              name="username"
              label="用户名"
              required={false}
              rules={[{ required: true, message: "用户名不能为空" }]}>
              <LargeInput />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              required={false}
              rules={[{ required: true, message: "密码不能为空" }]}>
              <LargeInputPas />
            </Form.Item>
            <LoginBtn type="primary" htmlType="submit">
              登录
            </LoginBtn>
          </FormWrapper>
        </LoginCard>
      </motion.div>
    </BgContainer>
  );
};

export default Login;
