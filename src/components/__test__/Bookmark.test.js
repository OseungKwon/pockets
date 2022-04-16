import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Bookmark from "../Bookmark/";

const MockBookmark = (
  stack = [{ id: 0, title: "root" }],
  className = "",
  id = "",
  onClickRoute = jest.fn(),
  onClickFolder = jest.fn()
) => {
  const elementData = {
    left: 100,
    top: 100,
    className: className,
    id: id
  };
  const bookmarks = [
    {
      title: "naver",
      id: "19",
      parentId: "1",
      url: "https://naver.com"
    },
    { title: "google", id: "20", parentId: "1", url: "https://naver.com" }
  ];
  const folders = [
    {
      title: "PC 북마크",
      id: "1",
      parentId: "0"
    }
  ];

  return render(
    <Bookmark
      stack={stack}
      bookmarks={bookmarks}
      folders={folders}
      elementData={elementData}
      onClickRoute={onClickRoute}
      onClickFolder={onClickFolder}
    />
  );
};

describe("<Bookmark/>", () => {
  it("북마크 text 확인", () => {
    MockBookmark();
    screen.getByText(/bookmark/i);
  });
  it("root 북마크일 때, '📒 PC 북마크' 보임", () => {
    MockBookmark();
    expect(screen.getByTestId("1").textContent).toBe("📒 PC 북마크");
  });
  it("'PC 북마크' 폴더일 때, 'naver','google' text와 icon 보임'", () => {
    const stack = [
      { id: 0, title: "root" },
      { id: 1, title: "PC 북마크" }
    ];
    MockBookmark(stack);
    // text 확인
    screen.getByText("naver");
    screen.getByText("google");
    // icon 확인
    screen.getByAltText("naver");
    screen.getByAltText("google");
  });
  it("북마크 href 정상 작동하는지 확인", () => {
    const stack = [
      { id: 0, title: "root" },
      { id: 1, title: "PC 북마크" }
    ];
    MockBookmark(stack);
    expect(screen.getByTitle("naver")).toHaveAttribute(
      "href",
      "https://naver.com"
    );
  });
  it("폴더 클릭 시, 이벤트 발생", () => {
    const stack = [{ id: 0, title: "root" }];
    const onClickFolder = jest.fn();
    MockBookmark(stack, "", "", undefined, onClickFolder);
    fireEvent.click(screen.getByTestId("1"));
    expect(onClickFolder).toHaveBeenCalled();
  });
  it("경로 클릭 시, 이벤트 발생", () => {
    const stack = [{ id: 0, title: "root" }];
    const onClickRoute = jest.fn();
    MockBookmark(stack, "", "", onClickRoute);
    fireEvent.click(screen.getByTestId("route_root"));
    expect(onClickRoute).toHaveBeenCalled();
  });
});
