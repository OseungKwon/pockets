import { useState, useEffect } from "react";

const useBookmarkStack = () => {
  const [stack, setStack] = useState([{ id: 0, title: "root" }]);

  // 북마크 경로 클릭
  const onClickRoute = (id) => {
    const idx = stack.findIndex((el) => el.id === id);
    setStack(stack.slice(0, idx + 1));
    // eslint-disable-next-line no-undef
    chrome.storage.sync.set({ bookmarkStack: stack.slice(0, idx + 1) });
  };

  // 폴더 클릭
  const onClickFolder = (id, title) => {
    setStack([...stack, { id: id, title: title }]);
    // eslint-disable-next-line no-undef
    chrome.storage.sync.set({
      bookmarkStack: [...stack, { id: id, title: title }]
    });
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.storage.sync.get("bookmarkStack", ({ bookmarkStack }) => {
      if (bookmarkStack) {
        setStack(bookmarkStack);
      } else {
        // eslint-disable-next-line no-undef
        chrome.storage.sync.set({ bookmarkStack: stack });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [stack, onClickRoute, onClickFolder];
};

export default useBookmarkStack;
