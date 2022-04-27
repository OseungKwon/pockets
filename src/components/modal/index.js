import React, { Suspense } from "react";

// redux
import { useDispatch } from "react-redux";
import { changeBgColor, changeModalState } from "../../store/slice/slice";

// style
import { ModalBase, ModalArea, H2, Content, ColorBox, XBtn } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const bgColors = ["#f8f8f8", "#ffcfcf", "#cfffe2", "#cfd1ff", "#cfe4ff"];

const SplitChart = React.lazy(() => import("../chart"));

const Modal = ({ topSites }) => {
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
        <H2>최다 방문 사이트</H2>
        <Content>
          <Suspense fallback={<div>loading</div>}>
            <SplitChart topSites={topSites} />
          </Suspense>
        </Content>
        <XBtn>
          <FontAwesomeIcon icon={faXmark} onClick={onCloseModal} />
        </XBtn>
      </ModalArea>
    </ModalBase>
  );
};

export default React.memo(Modal);
