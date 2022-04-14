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

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0 1rem;
  padding: 0.8rem 0rem;
  border-bottom: 1px solid #ccc;
`;

const App = () => {
  //const data = useSelector((state) => state.bookmark.boomarks);
  const [stack, setStack] = useState([{ id: 0, title: "root" }]);
  const [origin, setOrigin] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [folders, setFolders] = useState([]);
  const [number, setNumber] = useState([1, 2, 3]);
  const [topSites, setTopSites] = useState([]);

  const clickBtn = () => {
    console.log(bookmarks);
    setNumber([...number, 5]);
    console.log("stack", stack);
    // chrome.bookmarks.create({
    //   title: "Extension bookmarks",
    //   url: "https://developer.chrome.com/docs/extensions"
    // });
    alert("123");
  };

  const onClickRoute = (id) => {
    const idx = stack.findIndex((el) => el.id === id);
    setStack(stack.slice(0, idx + 1));
    chrome.storage.sync.set({ bookmarkStack: stack.slice(0, idx + 1) });
  };

  const onClickFolder = (id, title) => {
    setBookmarks(origin.filter((bookmark) => bookmark.parentId === id));
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
      setOrigin(bookmark);
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

  useEffect(() => {
    setBookmarks(origin);
  }, [origin]);

  return (
    <Wrapper>
      <button onClick={clickBtn}>버튼</button>

      <Container>
        <Title>bookmark</Title>
        <Topbar>
          {stack.map((el) => (
            <Stack
              onClick={() => {
                onClickRoute(el.id);
              }}
            >
              📂{el.title}
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
          {origin
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
        <Title>most viewed</Title>
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
    </Wrapper>
  );
};

export default App;
