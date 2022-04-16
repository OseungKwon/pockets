import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import BookMarkButtons from "../bookMarkButtons/";

const onAddCurB = jest.fn();
const onAddUserB = jest.fn();

describe("<BookMarkButtons/>", () => {
  it("북마크 text 확인", () => {
    render(<BookMarkButtons onAddCurB={onAddCurB} onAddUserB={onAddUserB} />);
    screen.getByText(/현재 페이지 북마크/i);
    screen.getByText(/선택한 페이지 북마크/i);
  });

  it("북마크 icon 확인", () => {
    render(<BookMarkButtons onAddCurB={onAddCurB} onAddUserB={onAddUserB} />);
    expect(screen.getByTestId("curBIcon")).toBeVisible();
    expect(screen.getByTestId("userBIcon")).toBeVisible();
  });
  it("북마크 클릭했을 때", () => {
    render(<BookMarkButtons onAddCurB={onAddCurB} onAddUserB={onAddUserB} />);
    fireEvent.click(screen.getByTestId("curBIcon"));
    fireEvent.click(screen.getByTestId("userBIcon"));
    expect(onAddCurB).toHaveBeenCalled();
    expect(onAddUserB).toHaveBeenCalled();
  });
});
