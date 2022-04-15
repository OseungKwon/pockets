import React from "react";

// style
import { Button, Menu } from "./style";
import { Container } from "../common/style";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const BookMarkButtons = ({ addCurrentBookmark, addAppointedBookmark }) => {
  return (
    <Container>
      <Menu>
        <Button onClick={addCurrentBookmark}>
          <FontAwesomeIcon icon={faBookmark} /> 현재 페이지 북마크
        </Button>
        <Button onClick={addAppointedBookmark}>
          <FontAwesomeIcon icon={faBookmark} /> 선택한 페이지 북마크
        </Button>
      </Menu>
    </Container>
  );
};

export default BookMarkButtons;
