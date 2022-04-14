/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";

import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #f8f8f8;
  width: 100%;
  height: 100vh;
`;

const Topbar = styled.div`
  margin: 1rem 1rem 0.5rem 1rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Stack = styled.div`
  cursor: pointer;
  padding: 0.2rem;
`;

const Container = styled.div`
  margin: 1rem;
  background: #fff;
  box-shadow: 1px 4px 4px 0 rgb(117 121 125 / 6%),
    0 1px 3px 0 rgb(113 117 121 / 20%);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
`;

const MostVisited = styled.div`
  flex: 2 2 3rem;
  padding: 1rem;
  height: 10rem;
  overflow: scroll;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;

const Bookmarks = styled.div`
  flex: 5 5 20rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const Folder = styled.div`
  cursor: pointer;
  padding: 0.2rem;
  &:hover {
    background-color: rgba(117, 221, 255, 0.77);
  }
`;

const Bookmark = styled.a`
  color: #000;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  padding: 0.2rem;
  margin: 0.1rem;
  display: flex;
  &:hover {
    background-color: rgba(117, 221, 255, 0.77);
  }
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
`;

const Favicon = styled.img`
  margin-right: 0.2rem;
`;

const H2 = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0 1rem;
  padding: 0.8rem 0rem;
  border-bottom: 1px solid #ccc;
`;

const Title = styled.div`
  margin: 1rem;
  font-size: 1.4rem;
  font-weight: 500;
  font-family: "Chewy", cursive;
`;

const TitleImg = styled.img`
  margin-right: 0.6rem;
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

  const clickBtn = async () => {
    const title = prompt("추가할 북마크 이름을 입력하세요");

    getTabData(function (tabdata) {
      chrome.bookmarks
        .create({
          title: title,
          url: tabdata.url,
          parentId: stack[stack.length - 1].id
        })
        .then(alert("성공적으로 추가하였습니다."));
    });
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
    <Wrapper>
      <Title>
        <TitleImg src="/favicon-32x32.png" alt="pocket" sizes="70x70" />
        Pocket
      </Title>

      <Container>
        <H2>bookmark</H2>
        <Topbar>
          {stack.map((el) => (
            <Stack
              onClick={() => {
                onClickRoute(el.id);
              }}
            >
              &gt; 📂{el.title}
            </Stack>
          ))}
        </Topbar>
        <Bookmarks>
          {folders
            .filter((el) => el.parentId === String(stack[stack.length - 1].id))
            .map((folder) => (
              <Folder
                onClick={() => {
                  onClickFolder(folder.id, folder.title);
                }}
              >
                📒 {folder.title}
              </Folder>
            ))}
          {bookmarks
            .filter((el) => el.parentId === String(stack[stack.length - 1].id))
            .map((bookmark) => (
              <Bookmark
                href={bookmark.url}
                target="_blank"
                title={bookmark.title}
              >
                <Favicon
                  src={
                    "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=" +
                    bookmark.url +
                    "&size=16"
                  }
                  alt=""
                />{" "}
                {bookmark.title}
              </Bookmark>
            ))}
        </Bookmarks>
      </Container>
      <Container>
        <H2>most viewed</H2>
        <MostVisited>
          {topSites.slice(0, 5).map((topSite) => (
            <a
              href={topSite.url}
              title={topSite.title}
              target="_blank"
              rel="noreferrer"
            >
              <Icon
                src={
                  "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=" +
                  topSite.url +
                  "&size=48"
                }
                alt=""
              />
            </a>
          ))}
        </MostVisited>
      </Container>
      <button onClick={clickBtn}>현재 페이지 북마크</button>
    </Wrapper>
  );
};

export default App;
