import { render, screen } from "@testing-library/react";
import Modal from "../modal";
import * as reactRedux from "react-redux";
import { wait } from "@testing-library/user-event/dist/utils";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

describe("<Header/>", () => {
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");

  const changeBgColor = jest.fn();
  useDispatchMock.mockReturnValue(changeBgColor);
  const changeModalState = jest.fn();
  useDispatchMock.mockReturnValue(changeModalState);

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  it("색 선택 text 확인", () => {
    render(<Modal />);
    screen.queryByText(/색 선택/i);
  });
  it("최다 방문 사이트 text 확인", async () => {
    useSelectorMock.mockImplementation((selectorFn) =>
      selectorFn({
        slice: {
          focusUrl: { title: "naver", viewCount: 1 }
        }
      })
    );
    render(<Modal />);

    await wait();
    expect(screen.getByText(/최다 방문 사이트/i)).toBeInTheDocument();
  });
});
