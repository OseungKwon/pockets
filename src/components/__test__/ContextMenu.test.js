import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ContextMenu from "../ContextMenu/";

const MockContextMenu = (className, onRemoveB = jest.fn()) => {
  const stack = [{ id: 0, title: "root" }];

  const elementData = {
    left: 100,
    top: 100,
    className: className,
    id: "3"
  };
  return render(
    <ContextMenu
      modalRef={null}
      elementData={elementData}
      stack={stack}
      onRemoveB={onRemoveB}
    />
  );
};

describe("<ContextMenu/>", () => {
  it("메뉴 내부 text 확인", () => {
    MockContextMenu("bookmark");
    screen.getByText(/삭제/i);
    screen.getByText(/북마크 추가/i);
    screen.getByText(/폴더 추가/i);
  });
  it("메뉴 내부 icon 확인", () => {
    MockContextMenu("bookmark");
    expect(screen.getByTestId("removeIcon")).toBeVisible();
    expect(screen.getByTestId("addBIcon")).toBeVisible();
    expect(screen.getByTestId("addFIcon")).toBeVisible();
  });
  it("bookmark클릭 시, 삭제 보임", () => {
    MockContextMenu("bookmark");
    screen.getByText(/삭제/i);
  });
  it("folder 클릭 시, 삭제 보임", () => {
    MockContextMenu("folder");
    screen.getByText(/삭제/i);
  });
  it("빈 공간 클릭 시, 삭제버튼 안보임", () => {
    MockContextMenu("");
    expect(screen.queryByText(/삭제/i)).not.toBeInTheDocument();
  });
  it("'북마크 추가' 클릭 시, 이벤트 발생", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    MockContextMenu("");
    fireEvent.click(screen.getByTestId("addBookmark"));
    expect(window.alert).toHaveBeenCalled();
  });
  it("'폴더 추가' 클릭 시, 이벤트 발생", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    MockContextMenu("");
    fireEvent.click(screen.getByTestId("addFolder"));
    expect(window.alert).toHaveBeenCalled();
  });
  it("'삭제' 클릭 시, 이벤트 발생", () => {
    const onRemoveB = jest.fn();
    MockContextMenu("bookmark", onRemoveB);
    fireEvent.click(screen.getByTestId("remove"));
    expect(onRemoveB).toHaveBeenCalled();
  });
});
