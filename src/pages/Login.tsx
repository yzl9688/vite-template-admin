import { FormProps, Form } from "antd";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../stores";
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
import { Transition } from "react-transition-group";

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
  const nodeRef = useRef(null);

  return (
    <BgContainer>
      <TopTitle>Vite template admin</TopTitle>
      <Transition nodeRef={nodeRef} in={true} timeout={300} appear={true}>
        {(state) => (
          <LoginCard ref={nodeRef} $status={state}>
            <Title>Login</Title>
            <FormWrapper
              onFinish={handleSubmit}
              layout="vertical"
              initialValues={{
                username: "admin",
                password: "123456",
              }}
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
        )}
      </Transition>
    </BgContainer>
  );
};

export default Login;
