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

  const [isOpen, elementData, modalRef, onContextMenu, onRemoveB] =
    useContextMenu();

  const [onAddCurB, onAddUserB, onAddFolder] = useAddBookmark(stack);

  return (
    <>
      <Wrapper onContextMenu={onContextMenu}>
        <Title>
          <TitleIcon>
            <FontAwesomeIcon icon={faFolderOpen} />
          </TitleIcon>
          Pocket
        </Title>
        {/* 북마크 area */}
        <BookMarks
          stack={stack}
          bookmarks={bookmarks}
          folders={folders}
          elementData={elementData}
          onClickRoute={onClickRoute}
          onClickFolder={onClickFolder}
        />
        {/* 가장 많이 방문한 사이트 area */}
        <MostVisited topSites={topSites} />
        {/* 북마크 추가 버튼 area */}
        <BookMarkButtons onAddCurB={onAddCurB} onAddUserB={onAddUserB} />
      </Wrapper>
      {/* 우클릭시 나오는 메뉴(context menu) */}
      {isOpen && (
        <ContextMenu
          modalRef={modalRef}
          elementData={elementData}
          onAddFolder={onAddFolder}
          onAddUserB={onAddUserB}
          onRemoveB={onRemoveB}
        />
      )}
    </>
  );
};

export default App;
