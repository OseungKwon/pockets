import React from "react";
import styled from "styled-components";

const Menu = styled.div`
  width: 8rem;
  position: absolute;
  border: 1px solid #ccc;
  box-shadow: 1px 4px 4px 0 rgb(117 121 125 / 6%),
    0 1px 3px 0 rgb(113 117 121 / 20%);
  background: #fff;
  border-radius: 8px;
  font-size: 13px;
  padding: 0.4rem;
  top: ${(props) => props.elementData.top}px;
  left: ${(props) => props.elementData.left}px;
`;

const Item = styled.div`
  padding: 0.2rem 0;
  cursor: pointer;
  border-radius: 6px;
  :hover {
    background: #eee;
  }
`;

const ContextMenu = ({ modalRef, elementData }) => {
  console.log("position", elementData.className);
  return (
    <Menu ref={modalRef} elementData={elementData}>
      <Item
        onClick={() => {
          if (elementData.className.includes("bookmark")) alert("북마크 삭제");
          else if (elementData.className.includes("folder")) alert("폴더 삭제");
          else {
            alert("다른 곳 클릭함");
          }
        }}
      >
        삭제
      </Item>
      <Item>페이지 추가</Item>
      <Item>폴더 추가</Item>
    </Menu>
  );
};

export default ContextMenu;
