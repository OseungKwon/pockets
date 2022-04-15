/* eslint-disable no-undef */
import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderPlus,
  faTrashCan,
  faBookmark
} from "@fortawesome/free-solid-svg-icons";

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
  display: flex;
  flex-direction: row;

  padding: 0.2rem 0.1rem;
  cursor: pointer;
  border-radius: 6px;
  :hover {
    background: #eee;
  }
`;

const Icon = styled.div`
  width: 20px;
  margin-right: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Span = styled.span``;

const ContextMenu = ({
  modalRef,
  elementData,
  addAppointedBookmark,
  setOpen,
  addFolder
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

  return (
    <Menu ref={modalRef} elementData={elementData}>
      {(elementData.className.includes("bookmark") ||
        elementData.className.includes("folder")) && (
        <Item onClick={onRemoveBookmark} style={{ color: "red" }}>
          <Icon>
            <FontAwesomeIcon icon={faTrashCan} />
          </Icon>
          <Span>삭제</Span>
        </Item>
      )}
      <Item onClick={addAppointedBookmark}>
        <Icon>
          <FontAwesomeIcon icon={faBookmark} />
        </Icon>
        <Span>북마크 추가</Span>
      </Item>
      <Item onClick={addFolder}>
        <Icon>
          <FontAwesomeIcon icon={faFolderPlus} />
        </Icon>
        <Span>폴더 추가</Span>
      </Item>
    </Menu>
  );
};

export default ContextMenu;
