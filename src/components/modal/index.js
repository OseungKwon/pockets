import React from "react";
import { useDispatch } from "react-redux";
import { changeBgColor, changeModalState } from "../../store/slice/slice";
import { ModalBase, ModalArea, H2, Content, ColorBox, XBtn } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const bgColors = ["#f8f8f8", "#ffcfcf", "#cfffe2", "#cfd1ff", "#cfe4ff"];

const Modal = () => {
  const dispatch = useDispatch();

  const onColorPick = (bgColor) => {
    dispatch(changeBgColor(bgColor));
  };

  const onCloseModal = () => {
    dispatch(changeModalState(false));
  };

  return (
    <ModalBase
      onClick={(e) => {
        e.stopPropagation();
        onCloseModal();
      }}
    >
      <ModalArea
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
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
        <XBtn>
          <FontAwesomeIcon icon={faXmark} onClick={onCloseModal} />
        </XBtn>
      </ModalArea>
    </ModalBase>
  );
};

export default Modal;
