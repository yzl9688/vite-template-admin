import styled from "styled-components";
import FullScreenBg from "../assets/full-screen-bg.jpeg";
import { Button, Form, Input } from "antd";

export const BgContainer = styled.div`
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

export const LoginCard = styled.div<{ $status: string }>`
  width: 300px;
  box-shadow: 0 25px 30px -13px rgba(40, 40, 40, 0.4);
  border-radius: 10px;
  padding: 30px 15px;
  background: #fff;
  margin: 0 auto;
  margin-top: 300px;
  position: relative;
  z-index: 9;
  transition: all 300ms ease-in;
  opacity: ${(props) => (props.$status == "entered" ? 1 : 0)};
  transform: ${(props) => (props.$status == "entered" ? "translateY(0px)" : "translateY(-100px)")};
`;

export const TopTitle = styled.h1`
  color: #fff;
  font-size: 18px;
  font-weight: 400;
  position: absolute;
  left: 100px;
  top: 30px;
  z-index: 9;
`;

export const Title = styled.h1`
  font-size: 28px;
  color: #333;
  font-weight: 300;
  text-align: center;
  margin-bottom: 20px;
`;

export const FormWrapper = styled(Form)`
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
  color: rgba(0, 0, 0, 0.88);
  border: 1px solid #e3e3e3;

  &:focus-within, &:hover {
    background-color: #fff;
  }
`;

export const LargeInput = styled(Input)`
  ${inputStyle}
`;

export const LargeInputPas = styled(Input.Password)`
  ${inputStyle}
`;

export const LoginBtn = styled(Button)`
  min-width: 180px;
  display: block;
  border-radius: 30px;
  color: #fff;
  font-size: 14px;
  line-height: 14px;
  padding: 8px 16px;
`;
