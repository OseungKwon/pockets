import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../header/";

describe("<Header/>", () => {
  it("pocket text 확인", () => {
    render(<Header />);
    screen.getByText(/Pocket/i);
  });
  it("pocket icon 확인", () => {
    render(<Header />);
    const iconElement = screen.getByTestId("titleIcon");
    expect(iconElement).toBeVisible();
  });
});
