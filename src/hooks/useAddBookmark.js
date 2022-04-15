const getTabData = (callback) => {
  // eslint-disable-next-line no-undef
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    callback(tabs[0]);
  });
};

const addBookmark = (stack, title, url) => {
  if (title !== null && url !== null) {
    // eslint-disable-next-line no-undef
    chrome.bookmarks.create({
      title: title,
      url: url,
      parentId: stack[stack.length - 1].id
    });
    alert("북마크를 추가했습니다");
    window.location.reload();
  } else alert("북마크 추가에 실패하였습니다");
};

const useAddBookmark = (stack) => {
  // 현재 탭에 있는 북마크 추가
  const onAddCurB = () => {
    if (stack[stack.length - 1].id !== 0) {
      getTabData(function (tabdata) {
        const title = prompt(
          "추가할 북마크 이름을 입력하세요",
          tabdata.title.slice(0, 35)
        );
        addBookmark(stack, title, tabdata.url);
      });
    } else {
      alert("root에서는 북마크 추가가 불가능합니다");
    }
  };

  // 사용자 지정 북마크 추가
  const onAddUserB = () => {
    if (stack[stack.length - 1].id !== 0) {
      const title = prompt("추가할 북마크 이름을 입력하세요");
      const url = prompt("추가할 url 주소를 입력하세요", "https://");
      addBookmark(stack, title, url);
    } else {
      alert("root에서는 북마크 추가가 불가능합니다");
    }
  };

  // 폴더 추가
  const onAddFolder = () => {
    if (stack[stack.length - 1].id !== 0) {
      const title = prompt("추가할 폴더 이름을 입력하세요");
      if (title !== null) {
        // eslint-disable-next-line no-undef
        chrome.bookmarks.create({
          title: title,
          parentId: stack[stack.length - 1].id
        });
        alert("폴더를 추가했습니다");
      } else alert("폴더 추가에 실패하였습니다");
      window.location.reload();
    } else {
      alert("root에서는 폴더 추가가 불가능합니다");
    }
  };

  return [onAddCurB, onAddUserB, onAddFolder];
};

export default useAddBookmark;
