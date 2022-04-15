import React from "react";
import styled from "styled-components";
import { Container, H2 } from "../common/style";

const Favicon = styled.img`
  margin-right: 0.2rem;
`;

const Bookmark = styled.a`
  color: #000;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  margin: 0.1rem;
  display: flex;
  cursor: pointer;
  padding: 0.3rem;
  border-radius: 6px;
  &:hover {
    background-color: #eee;
  }
  transition: 0.1s cubic-bezier(0, 0, 0.2, 1);
  background: ${(props) => props.focus && "#eee"};
`;

const Topbar = styled.div`
  margin: 1rem 1rem 0.5rem 1rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  border: 1px solid #ccc;
  overflow-x: scroll;
`;

const Stack = styled.div`
  white-space: nowrap;
  cursor: pointer;
  padding: 0.3rem;
  border-radius: 6px;
  &:hover:focus {
    background-color: #eee;
  }
  transition: 0.1s cubic-bezier(0, 0, 0.2, 1);
`;

const Space = styled.div`
  flex: 5 5 20rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const Folder = styled.div`
  cursor: pointer;
  padding: 0.3rem;
  margin: 0.1rem;
  border-radius: 6px;
  &:hover {
    background-color: #eee;
  }
  transition: 0.1s cubic-bezier(0, 0, 0.2, 1);
  background: ${(props) => props.focus && "#eee"};
`;

const BookMarks = ({
  stack,
  onClickRoute,
  folders,
  onClickFolder,
  bookmarks,
  elementData
}) => {
  return (
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
      <Space>
        {folders
          .filter((el) => el.parentId === String(stack[stack.length - 1].id))
          .map((folder) => (
            <Folder
              key={folder.id}
              className="folder"
              id={folder.id}
              onClick={() => {
                onClickFolder(folder.id, folder.title);
              }}
              focus={elementData.id === folder.id}
            >
              📒 {folder.title}
            </Folder>
          ))}
        {bookmarks
          .filter((el) => el.parentId === String(stack[stack.length - 1].id))
          .map((bookmark) => (
            <Bookmark
              key={bookmark.id}
              className="bookmark"
              id={bookmark.id}
              href={bookmark.url}
              target="_blank"
              title={bookmark.title}
              focus={elementData.id === bookmark.id}
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
      </Space>
    </Container>
  );
};

export default BookMarks;
