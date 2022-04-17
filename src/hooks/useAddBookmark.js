const getTabData = (callback) => {
  // eslint-disable-next-line no-undef
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    callback(tabs[0]);
  });
};

const createBookmark = (title, stack, url) => {
  let object = { title: title, parentId: stack[stack.length - 1] };
  if (url) {
    object[url] = url;
  }
  // eslint-disable-next-line no-undef
  chrome.bookmarks.create({
    title: title,
    url: url,
    parentId: stack[stack.length - 1].id
  });
};

const alertMecro = (str, type) => {
  let data;
  switch (type) {
    case "add":
      data = `${str}를 추가했습니다`;
      break;
    case "fail":
      data = `${str} 추가에 실패하였습니다`;
      break;
    case "impossible":
      data = `${str}에서는 추가가 불가능합니다`;
      break;
    default:
      data = `error`;
  }
  alert(data);
};

const addBookmark = (stack, title, url) => {
  if (title !== null && url !== null) {
    createBookmark(title, stack, url);
    alertMecro("북마크", "add");
    window.location.reload();
  } else alertMecro("북마크", "fail");
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
      alertMecro("root", "impossible");
    }
  };

  // 사용자 지정 북마크 추가
  const onAddUserB = () => {
    if (stack[stack.length - 1].id !== 0) {
      const title = prompt("추가할 북마크 이름을 입력하세요");
      const url = prompt("추가할 url 주소를 입력하세요", "https://");
      addBookmark(stack, title, url);
    } else {
      alertMecro("root", "impossible");
    }
  };

  // 폴더 추가
  const onAddFolder = () => {
    if (stack[stack.length - 1].id !== 0) {
      const title = prompt("추가할 폴더 이름을 입력하세요");
      if (title !== null) {
        createBookmark(title, stack);
        alertMecro("폴더", "add");
      } else alertMecro("폴더", "fail");
      window.location.reload();
    } else {
      alertMecro("root", "impossible");
    }
  };

  return [onAddCurB, onAddUserB, onAddFolder];
};

export default useAddBookmark;
