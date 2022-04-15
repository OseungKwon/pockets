import React from "react";

// style
import { Button, Menu } from "./style";
import { Container } from "../common/style";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const BookMarkButtons = ({ onAddCurB, onAddUserB }) => {
  return (
    <Container>
      <Menu>
        <Button onClick={onAddCurB}>
          <FontAwesomeIcon icon={faBookmark} /> 현재 페이지 북마크
        </Button>
        <Button onClick={onAddUserB}>
          <FontAwesomeIcon icon={faBookmark} /> 선택한 페이지 북마크
        </Button>
      </Menu>
    </Container>
  );
};

export default BookMarkButtons;
