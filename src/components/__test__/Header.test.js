import { render, screen } from "@testing-library/react";
import Header from "../header/";
import * as reactRedux from "react-redux";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

describe("<Header/>", () => {
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  it("pocket text 확인", () => {
    render(<Header />);
    screen.getByText(/Pocket/i);
  });
  it("pocket icon 확인", () => {
    render(<Header />);
    const titleIcon = screen.getByTestId("titleIcon");
    expect(titleIcon).toBeVisible();
  });
  it("setting icon 확인", () => {
    render(<Header />);
    const titleIcon = screen.getByTestId("titleIcon");
    expect(titleIcon).toBeVisible();
  });
});
