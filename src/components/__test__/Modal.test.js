import { render, screen } from "@testing-library/react";
import Modal from "../modal";
import * as reactRedux from "react-redux";
import { wait } from "@testing-library/user-event/dist/utils";

const mockModal = (useSelectorMock) => {
  useSelectorMock.mockImplementation((selectorFn) =>
    selectorFn({
      slice: {
        focusUrl: { title: "naver", viewCount: 1 }
      }
    })
  );
  return render(<Modal />);
};

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

describe("<Modal/>", () => {
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

  it("색 선택 text 확인", async () => {
    render(<Modal />);
    await wait();
    screen.queryByText(/색 선택/i);
  });
  it("최다 방문 사이트 text 확인", async () => {
    mockModal(useSelectorMock);
    await wait();
    expect(screen.getByText(/최다 방문 사이트/i)).toBeInTheDocument();
  });
  it("색 선택 box 확인", async () => {
    mockModal(useSelectorMock);
    await wait();
    const colorBoxes = screen.getAllByTestId("colorBox");
    colorBoxes.map((colorBox) => expect(colorBox).toBeInTheDocument());
  });
  it("d3 그래프 확인", async () => {
    mockModal(useSelectorMock);
    await wait();
    expect(screen.getByTestId(/d3Chart/i)).toBeInTheDocument();
  });
});
