import React from "react";

// style
import { Favicon, Bookmark, Topbar, Stack, Space, Folder } from "./style";
import { Container, H2 } from "../common/style";

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
            key={el.id}
            onClick={() => {
              onClickRoute(el.id);
            }}
            data-testid={"route_" + el.title}
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
              data-testid={folder.id}
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
                src={"chrome://favicon/size/16@1x/" + bookmark.url}
                alt={bookmark.title}
              />{" "}
              {bookmark.title}
            </Bookmark>
          ))}
      </Space>
    </Container>
  );
};

export default React.memo(BookMarks);
