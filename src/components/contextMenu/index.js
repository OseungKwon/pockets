import React from "react";

// style
import { Menu, Item, Icon, Span } from "./style";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderPlus,
  faTrashCan,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import useAddBookmark from "../../hooks/useAddBookmark";

const ContextMenu = ({ modalRef, elementData, stack, onRemoveB }) => {
  const [onAddCurB, onAddUserB, onAddFolder] = useAddBookmark(stack);

  return (
    <Menu ref={modalRef} elementData={elementData}>
      {(elementData.className.includes("bookmark") ||
        elementData.className.includes("folder")) && (
        <Item onClick={onRemoveB} style={{ color: "red" }} data-testid="remove">
          <Icon>
            <FontAwesomeIcon icon={faTrashCan} data-testid="removeIcon" />
          </Icon>
          <Span>삭제</Span>
        </Item>
      )}
      <Item onClick={onAddUserB} data-testid="addBookmark">
        <Icon>
          <FontAwesomeIcon icon={faBookmark} data-testid="addBIcon" />
        </Icon>
        <Span>북마크 추가</Span>
      </Item>
      <Item onClick={onAddFolder} data-testid="addFolder">
        <Icon>
          <FontAwesomeIcon icon={faFolderPlus} data-testid="addFIcon" />
        </Icon>
        <Span>폴더 추가</Span>
      </Item>
    </Menu>
  );
};

export default ContextMenu;
