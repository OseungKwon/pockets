/* eslint-disable no-undef */
import React, { useEffect, useState, useRef } from "react";
import useContextMenu from "./hooks/useContextMenu";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";

import BookMarks from "./components/bookmark";
import BookMarkButtons from "./components/bookmarkButtons";
import MostVisited from "./components/mostVisitied";
import ContextMenu from "./components/contextMenu";
import useAddBookmark from "./hooks/useAddBookmark";
import useBookmarkStack from "./hooks/useBookmarkStack";
import useItems from "./hooks/useItems";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #f8f8f8;
  width: 100%;
  height: 100vh;
`;

const TitleIcon = styled.span`
  margin-right: 0.6rem;
`;

const Title = styled.div`
  margin: 1rem;
  font-size: 1.4rem;
  font-weight: 500;
  font-family: "Chewy", cursive;
`;

const App = () => {
  const [stack, onClickRoute, onClickFolder] = useBookmarkStack();

  const [open, elementData, modalRef, onContextMenu, onRemoveBookmark] =
    useContextMenu();

  const [addCurrentBookmark, addAppointedBookmark, addFolder] =
    useAddBookmark(stack);

  const [bookmarks, folders, topSites] = useItems();

  return (
    <>
      <Wrapper onContextMenu={onContextMenu}>
        <Title>
          <TitleIcon>
            <FontAwesomeIcon icon={faFolderOpen} />
          </TitleIcon>
          Pocket
        </Title>

        <BookMarks
          stack={stack}
          onClickRoute={onClickRoute}
          folders={folders}
          onClickFolder={onClickFolder}
          bookmarks={bookmarks}
          elementData={elementData}
        />
        <MostVisited topSites={topSites} />
        <BookMarkButtons
          addCurrentBookmark={addCurrentBookmark}
          addAppointedBookmark={addAppointedBookmark}
        />
      </Wrapper>
      {open && (
        <ContextMenu
          addFolder={addFolder}
          modalRef={modalRef}
          elementData={elementData}
          addAppointedBookmark={addAppointedBookmark}
          onRemoveBookmark={onRemoveBookmark}
        />
      )}
    </>
  );
};

export default App;
