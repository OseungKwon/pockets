import React from "react";

// style
import { Menu, Item, Icon, Span } from "./style";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderPlus,
  faTrashCan,
  faBookmark
} from "@fortawesome/free-solid-svg-icons";

const ContextMenu = ({
  modalRef,
  elementData,
  addAppointedBookmark,
  onRemoveBookmark,
  addFolder
}) => {
  console.log("position", elementData.className);

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
