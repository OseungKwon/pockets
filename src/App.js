import React from "react";

// style
import { Wrapper, TitleIcon, Title } from "./style";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";

// components
import BookMarks from "./components/bookmark";
import BookMarkButtons from "./components/bookmarkButtons";
import MostVisited from "./components/mostVisitied";
import ContextMenu from "./components/contextMenu";

// hooks
import useContextMenu from "./hooks/useContextMenu";
import useAddBookmark from "./hooks/useAddBookmark";
import useBookmarkStack from "./hooks/useBookmarkStack";
import useItems from "./hooks/useItems";

const App = () => {
  const [bookmarks, folders, topSites] = useItems();

  const [stack, onClickRoute, onClickFolder] = useBookmarkStack();

  const [open, elementData, modalRef, onContextMenu, onRemoveBookmark] =
    useContextMenu();

  const [addCurrentBookmark, addAppointedBookmark, addFolder] =
    useAddBookmark(stack);

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
