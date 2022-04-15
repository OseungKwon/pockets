/* eslint-disable no-undef */
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
  padding: 0.2rem 0.1rem;
  cursor: pointer;
  border-radius: 6px;
  :hover {
    background: #eee;
  }
`;

const ContextMenu = ({
  bookmarks,
  modalRef,
  elementData,
  addAppointedBookmark,
  setOpen
}) => {
  console.log("position", elementData.className);

  const onRemoveBookmark = () => {
    if (elementData.className.includes("bookmark")) {
      if (window.confirm("북마크 삭제"))
        chrome.bookmarks.remove(elementData.id);
    } else if (elementData.className.includes("folder")) {
      if (window.confirm("폴더 삭제")) chrome.bookmarks.remove(elementData.id);
    }
    setOpen(false);
    window.location.reload();
  };

  const onAddBookmark = () => {
    addAppointedBookmark();
  };

  return (
    <Menu ref={modalRef} elementData={elementData}>
      {(elementData.className.includes("bookmark") ||
        elementData.className.includes("folder")) && (
        <Item onClick={onRemoveBookmark}>삭제</Item>
      )}
      <Item onClick={onAddBookmark}>북마크 추가</Item>
      <Item>폴더 추가</Item>
    </Menu>
  );
};

export default ContextMenu;
