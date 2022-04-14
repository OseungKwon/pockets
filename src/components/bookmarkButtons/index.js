import React from "react";
import styled from "styled-components";
import { Container } from "../common/style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const Button = styled.div`
  margin: 0.5rem 0;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ddd;
  &:hover {
    transition: 0.1s cubic-bezier(0, 0, 0.2, 1);
    color: #fff;
    background-color: #000;
  }
`;

const Menu = styled.div`
  font-size: 15px;
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;

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
