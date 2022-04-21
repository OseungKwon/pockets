import React from "react";
import { ModalBase, ModalArea, H2, Content, ColorBox } from "./style";

const bgColors = ["#ffcfcf", "#cfffe2", "#cfd1ff", "#cfe4ff"];

const Modal = () => {
  return (
    <ModalBase>
      <ModalArea>
        <H2>색 선택</H2>
        <Content>
          {bgColors.map((bgColor) => (
            <ColorBox bgColor={bgColor}></ColorBox>
          ))}
        </Content>
      </ModalArea>
    </ModalBase>
  );
};

export default Modal;
