/* eslint-disable no-undef */
import React from "react";

function getTabData(callback) {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    callback(tabs[0]);
  });
}

const useAddBookmark = (stack) => {
  const addCurrentBookmark = async () => {
    getTabData(function (tabdata) {
      const title = prompt(
        "추가할 북마크 이름을 입력하세요",
        tabdata.title.slice(0, 35)
      );
      if (title !== null) {
        chrome.bookmarks.create({
          title: title,
          url: tabdata.url,
          parentId: stack[stack.length - 1].id
        });
        alert("북마크를 추가했습니다");
      } else alert("북마크 추가에 실패하였습니다");
    });

    window.location.reload();
  };

  const addAppointedBookmark = () => {
    const title = prompt("추가할 북마크 이름을 입력하세요");
    const url = prompt("추가할 url 주소를 입력하세요", "https://");
    if (title !== null && url !== null) {
      chrome.bookmarks.create({
        title: title,
        url: url,
        parentId: stack[stack.length - 1].id
      });
      alert("북마크를 추가했습니다");
    } else alert("북마크 추가에 실패하였습니다");

    window.location.reload();
  };

  const addFolder = () => {
    const title = prompt("추가할 폴더 이름을 입력하세요");
    if (title !== null) {
      chrome.bookmarks.create({
        title: title,
        parentId: stack[stack.length - 1].id
      });
      alert("북마크를 추가했습니다");
    } else alert("북마크 추가에 실패하였습니다");
    window.location.reload();
  };
  return [addCurrentBookmark, addAppointedBookmark, addFolder];
};

export default useAddBookmark;
