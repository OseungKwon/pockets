/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";

import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
  height: 30rem;
`;

const Topbar = styled.div`
  display: flex;
  flex-direction: row;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Bookmarks = styled.a`
  flex: 2;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const Folders = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Folder = styled.div`
  cursor: pointer;
  padding: 0.2rem;
  &:hover {
    background-color: rgba(117, 221, 255, 0.77);
  }
`;

const Bookmark = styled.div`
  cursor: pointer;
  padding: 0.2rem;
  &:hover {
    background-color: rgba(117, 221, 255, 0.77);
  }
`;

const App = () => {
  //const data = useSelector((state) => state.bookmark.boomarks);
  const [stack, setStack] = useState([]);
  const [origin, setOrigin] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [folders, setFolders] = useState([]);
  const [number, setNumber] = useState([1, 2, 3]);

  const clickBtn = () => {
    console.log(bookmarks);
    setNumber([...number, 5]);
    // chrome.bookmarks.create({
    //   title: "Extension bookmarks",
    //   url: "https://developer.chrome.com/docs/extensions"
    // });
    alert("123");
  };

  const onClickFolder = (id) => {
    setBookmarks(origin.filter((bookmark) => bookmark.parentId === id));
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
          if (node.parentId && node.parentId !== `0`) {
            let temp = {
              title: node.title,
              id: node.id,
              parentId: node.parentId
            };
            folder.push(temp);
          }
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
      <Topbar></Topbar>
      <Container>
        <Folders>
          {folders.map((folder) => (
            <Folder
              onClick={() => {
                onClickFolder(folder.id);
              }}
            >
              📒 {folder.title}
            </Folder>
          ))}
        </Folders>
        <Bookmarks>
          {bookmarks.map((bookmark) => (
            <Bookmark href={bookmark.url}>📄 {bookmark.title}</Bookmark>
          ))}
        </Bookmarks>
      </Container>
    </Wrapper>
  );
};

export default App;
