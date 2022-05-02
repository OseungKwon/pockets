import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Chart from "../chart";
import * as reactRedux from "react-redux";

const mockTopSites = [
  { title: "naver", url: "https://www.naver.com", value: 2 },
  {
    title: "daum",
    url: "https://www.daum.net",
    value: 3
  }
];

const mockChart = (useSelectorMock) => {
  useSelectorMock.mockImplementation((selectorFn) =>
    selectorFn({
      slice: {
        focusUrl: { title: "naver", viewCount: 1 }
      }
    })
  );
  return render(<Chart topSites={mockTopSites} />);
};

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

describe("<Chart/>", () => {
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });
  it("chart 생성됐는지 확인", () => {
    mockChart(useSelectorMock);
    expect(screen.getByTestId("d3Chart")).toBeInTheDocument();
  });
  it("chart 가운데에 text 있는지 확인", () => {
    mockChart(useSelectorMock);
    expect(screen.getByTestId(/focusTitle/i)).toBeInTheDocument();
    expect(screen.getByTestId(/focusText/i)).toBeInTheDocument();
  });
});
