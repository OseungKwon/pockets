import React from "react";
import { useDispatch } from "react-redux";
import { changeBgColor } from "../../store/slice/slice";
import { ModalBase, ModalArea, H2, Content, ColorBox } from "./style";

const bgColors = ["#ffcfcf", "#cfffe2", "#cfd1ff", "#cfe4ff"];

const Modal = () => {
  const dispatch = useDispatch();

  const onColorPick = (bgColor) => {
    dispatch(changeBgColor(bgColor));
  };

  return (
    <ModalBase>
      <ModalArea>
        <H2>색 선택</H2>
        <Content>
          {bgColors.map((bgColor) => (
            <ColorBox
              bgColor={bgColor}
              onClick={() => {
                onColorPick(bgColor);
              }}
            ></ColorBox>
          ))}
        </Content>
      </ModalArea>
    </ModalBase>
  );
};

export default Modal;
