import React, { useEffect } from "react";

// style
import { Wrapper } from "./style";

// components
import BookMarks from "./components/bookmark";
import BookMarkButtons from "./components/bookmarkButtons";
import MostVisited from "./components/mostVisitied";
import ContextMenu from "./components/contextMenu";

// hooks
import useContextMenu from "./hooks/useContextMenu";
import useBookmarkStack from "./hooks/useBookmarkStack";
import useItems from "./hooks/useItems";
import Header from "./components/header";

// redux
import { useSelector, useDispatch } from "react-redux";
import { changeBgColor } from "./store/slice/slice";

const App = () => {
  const dispatch = useDispatch();
  const bgColor = useSelector((state) => state.slice.bgColor);

  const [bookmarks, folders, topSites] = useItems();

  const [stack, onClickRoute, onClickFolder] = useBookmarkStack();

  const [isOpen, elementData, modalRef, onContextMenu, onRemoveB] =
    useContextMenu();

  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.storage.sync.get("bgColor", ({ bgColor }) => {
      if (bgColor) {
        dispatch(changeBgColor(bgColor));
      } else {
        // eslint-disable-next-line no-undef
        chrome.storage.sync.set({ bgColor: bgColor });
      }
    });
  }, [dispatch]);

  return (
    <>
      <Wrapper onContextMenu={onContextMenu} bgColor={bgColor || "#f8f8f8"}>
        {/* 헤더 area */}
        <Header topSites={topSites} />
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
        <BookMarkButtons stack={stack} />
      </Wrapper>
      {/* 우클릭시 나오는 메뉴(context menu) area*/}
      {isOpen && (
        <ContextMenu
          modalRef={modalRef}
          stack={stack}
          elementData={elementData}
          onRemoveB={onRemoveB}
        />
      )}
    </>
  );
};

export default App;
