import { Fade } from "@/styles/Fade.styled";
import { Layout } from "antd";
import useToken from "antd/es/theme/useToken";
import React, { useRef } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";

const Content: React.FC = () => {
  const [, token] = useToken();
  const location = useLocation();
  const outlet = useOutlet();
  const nodeRef = useRef(null);

  return (
    <Layout.Content
      id="content-area"
      style={{
        background: token.colorBgLayout,
      }}
      className="p-2 rounded-s overflow-hidden overflow-y-auto">
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={location.pathname}
          nodeRef={nodeRef}
          timeout={300}
          classNames="fade"
          appear={true}>
          <Fade ref={nodeRef}>{outlet}</Fade>
        </CSSTransition>
      </SwitchTransition>
    </Layout.Content>
  );
};

export default Content;
