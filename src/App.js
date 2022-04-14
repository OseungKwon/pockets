/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";

import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  height: 30rem;
`;

const Topbar = styled.div`
  margin: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  border: 1px solid #c7c7c7;
  > {
    padding: 0 0.2rem;
  }
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Folders = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Bookmarks = styled.div`
  height: 100%;
  flex: 3;
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
  &:hover {
    background-color: rgba(117, 221, 255, 0.77);
  }
`;

const App = () => {
  //const data = useSelector((state) => state.bookmark.boomarks);
  const [stack, setStack] = useState([{ id: 0, title: "root" }]);
  const [origin, setOrigin] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [folders, setFolders] = useState([]);
  const [number, setNumber] = useState([1, 2, 3]);

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
  };

  const onClickFolder = (id, title) => {
    setBookmarks(origin.filter((bookmark) => bookmark.parentId === id));
    setStack([...stack, { id: id, title: title }]);
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
      console.log("a", folder);
      console.log("b", bookmark);
      await setOrigin(bookmark);
      await setFolders(folder);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setBookmarks(origin);
  }, [origin]);
  return (
    <Wrapper>
      <button onClick={clickBtn}>버튼</button>
      <Topbar>
        {stack.map((el) => (
          <div
            onClick={() => {
              onClickRoute(el.id);
            }}
          >
            📂{el.title}
          </div>
        ))}
      </Topbar>
      <Container>
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
                📄 {bookmark.title}
              </Bookmark>
            ))}
        </Bookmarks>
        <Folders></Folders>
      </Container>
    </Wrapper>
  );
};

export default App;
