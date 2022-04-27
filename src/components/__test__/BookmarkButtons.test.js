import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import BookMarkButtons from "../bookMarkButtons/";

const stack = [{ id: 0, title: "root" }];

// const onAddCurB = jest.fn();
// const onAddUserB = jest.fn();

describe("<BookMarkButtons/>", () => {
  it("북마크 text 확인", () => {
    render(<BookMarkButtons stack={stack} />);
    screen.getByText(/현재 페이지 북마크/i);
    screen.getByText(/선택한 페이지 북마크/i);
  });

  it("북마크 icon 확인", () => {
    render(<BookMarkButtons stack={stack} />);
    expect(screen.getByTestId("curBIcon")).toBeVisible();
    expect(screen.getByTestId("userBIcon")).toBeVisible();
  });
  it("북마크 클릭했을 때", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    render(<BookMarkButtons stack={stack} />);
    fireEvent.click(screen.getByTestId("curBIcon"));
    fireEvent.click(screen.getByTestId("userBIcon"));
    expect(window.alert).toHaveBeenCalledTimes(2);
  });
});
