/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import BookMarks from "./components/bookmark";
import MostVisited from "./components/mostVisitied";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #f8f8f8;
  width: 100%;
  height: 100vh;
`;

const Container = styled.div`
  margin: 0.5rem 1rem;
  background: #fff;
  box-shadow: 1px 4px 4px 0 rgb(117 121 125 / 6%),
    0 1px 3px 0 rgb(113 117 121 / 20%);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
`;

const TitleImg = styled.img`
  margin-right: 0.6rem;
`;

const Menu = styled.div`
  font-size: 15px;
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;

const Title = styled.div`
  margin: 1rem;
  font-size: 1.4rem;
  font-weight: 500;
  font-family: "Chewy", cursive;
`;

const Button = styled.div`
  margin: 0.5rem 0;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ddd;
  &:hover {
    transition: 0.1s cubic-bezier(0, 0, 0.2, 1);
    color: #fff;
    background-color: #000;
  }
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

  const addCurrentBookmark = async () => {
    getTabData(function (tabdata) {
      const title = prompt(
        "추가할 북마크 이름을 입력하세요",
        tabdata.title.slice(0, 35)
      );
      title !== null
        ? chrome.bookmarks
            .create({
              title: title,
              url: tabdata.url,
              parentId: stack[stack.length - 1].id
            })
            .then(alert("성공적으로 추가하였습니다."))
        : alert("북마크 추가 실패");
    });

    window.location.reload();
  };

  const addAppointedBookMark = () => {
    const title = prompt("추가할 북마크 이름을 입력하세요");
    const url = prompt("추가할 url 주소를 입력하세요.");
    title !== null && url !== null
      ? chrome.bookmarks
          .create({
            title: title,
            url: url,
            parentId: stack[stack.length - 1].id
          })
          .then(alert("성공적으로 추가하였습니다."))
      : alert("북마크 추가 실패");
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
    <Wrapper>
      <Title>
        <TitleImg src="/favicon-32x32.png" alt="pocket" sizes="70x70" />
        Pocket
      </Title>

      <Container>
        <BookMarks
          stack={stack}
          onClickRoute={onClickRoute}
          folders={folders}
          onClickFolder={onClickFolder}
          bookmarks={bookmarks}
        />
      </Container>
      <Container>
        <MostVisited topSites={topSites} />
      </Container>
      <Container>
        <Menu>
          <Button onClick={addCurrentBookmark}>
            <FontAwesomeIcon icon={faBookmark} /> 현재 페이지 북마크
          </Button>
          <Button onClick={addAppointedBookMark}>
            <FontAwesomeIcon icon={faBookmark} /> 페이지 지정 북마크
          </Button>
        </Menu>
      </Container>
    </Wrapper>
  );
};

export default App;
