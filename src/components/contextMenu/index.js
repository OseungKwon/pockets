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
  onAddFolder,
  onAddUserB,
  onRemoveB
}) => {
  console.log("position", elementData.className);

  return (
    <Menu ref={modalRef} elementData={elementData}>
      {(elementData.className.includes("bookmark") ||
        elementData.className.includes("folder")) && (
        <Item onClick={onRemoveB} style={{ color: "red" }}>
          <Icon>
            <FontAwesomeIcon icon={faTrashCan} />
          </Icon>
          <Span>삭제</Span>
        </Item>
      )}
      <Item onClick={onAddUserB}>
        <Icon>
          <FontAwesomeIcon icon={faBookmark} />
        </Icon>
        <Span>북마크 추가</Span>
      </Item>
      <Item onClick={onAddFolder}>
        <Icon>
          <FontAwesomeIcon icon={faFolderPlus} />
        </Icon>
        <Span>폴더 추가</Span>
      </Item>
    </Menu>
  );
};

export default ContextMenu;
