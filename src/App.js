import React from "react";

// style
import { Wrapper } from "./style";

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
import Header from "./components/header";

// redux
import { useSelector } from "react-redux";

const App = () => {
  const bgColor = useSelector((state) => state.slice.bgColor);

  const [bookmarks, folders, topSites] = useItems();

  const [stack, onClickRoute, onClickFolder] = useBookmarkStack();

  const [isOpen, elementData, modalRef, onContextMenu, onRemoveB] =
    useContextMenu();

  const [onAddCurB, onAddUserB, onAddFolder] = useAddBookmark(stack);

  const a = () => {
    // eslint-disable-next-line no-undef
    chrome.history.search({ text: "", maxResults: 10 }, function (data) {
      data.forEach(function (page) {
        console.log(page.url);
      });
    });
  };

  console.log("bgc", bgColor);

  return (
    <>
      <Wrapper onContextMenu={onContextMenu} bgColor={bgColor || "#f8f8f8"}>
        {/* 헤더 area */}
        <Header />
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
      {/* 우클릭시 나오는 메뉴(context menu) area*/}
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
