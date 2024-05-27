import { FormProps, Form } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../stores";
import { motion } from "framer-motion";
import {
  BgContainer,
  FormWrapper,
  LargeInput,
  LargeInputPas,
  LoginBtn,
  LoginCard,
  Title,
  TopTitle,
} from "./Login.styled";
import useRequest from "@/hooks/useRequest";
import { ResponseData } from "@/types";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const setToken = useGlobalStore((state) => state.setToken);

  const { trigger } = useRequest("/login");

  const handleSubmit: FormProps["onFinish"] = async (values) => {
    const res = (await trigger(values)) as unknown as ResponseData<{
      token: string;
    }>;
    if (res.data) {
      setToken(res.data.token);
      navigate("/");
    }
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
