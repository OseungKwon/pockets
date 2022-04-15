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

function getTabData(callback) {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    callback(tabs[0]);
  });
}

const App = () => {
  //const data = useSelector((state) => state.bookmark.boomarks);
  const [stack, setStack] = useState([{ id: 0, title: "root" }]);
  const [bookmarks, setBookmarks] = useState([]);
  const [folders, setFolders] = useState([]);
  const [topSites, setTopSites] = useState([]);

  const [open, elementData, modalRef, onContextMenu, onRemoveBookmark] =
    useContextMenu();

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

  const onClickRoute = (id) => {
    const idx = stack.findIndex((el) => el.id === id);
    setStack(stack.slice(0, idx + 1));
    chrome.storage.sync.set({ bookmarkStack: stack.slice(0, idx + 1) });
  };

  const onClickFolder = (id, title) => {
    setStack([...stack, { id: id, title: title }]);
    chrome.storage.sync.set({
      bookmarkStack: [...stack, { id: id, title: title }]
    });
  };

  useEffect(() => {
    async function fetchData() {
      const folder = [];
      const bookmark = [];

      await chrome.bookmarks.getTree(function (bmTree) {
        bmTree.forEach(function (node) {
          processNode(node);
        });
      });
      setBookmarks(bookmark);
      setFolders(folder);

      function processNode(node) {
        if (node.children) {
          let temp = {
            title: node.title,
            id: node.id,
            parentId: node.parentId
          };
          folder.push(temp);

          node.children.forEach(processNode);
        }
        if (node.url) {
          let temp = {
            title: node.title,
            id: node.id,
            parentId: node.parentId,
            url: node.url
          };
          bookmark.push(temp);
        }
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const topSite = [];
    chrome.topSites.get(top_site);
    function top_site(urls) {
      topSite.push(...urls);
    }

    setTopSites(topSite);
  }, []);

  useEffect(() => {
    chrome.storage.sync.get("bookmarkStack", ({ bookmarkStack }) => {
      if (bookmarkStack) {
        setStack(bookmarkStack);
      } else {
        chrome.storage.sync.set({ bookmarkStack: stack });
      }
    });
  }, []);

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
