import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import MostVisited from "../mostVisitied/";

const mockData = [
  {
    from_history: false,
    managed: false,
    title: "Twitch",
    url: "http://www.twitch.tv/"
  },
  {
    from_history: false,
    managed: false,
    title: "네이버 웹툰",
    url: "http://comic.naver.com/"
  },
  {
    from_history: true,
    managed: false,
    title: "NAVER",
    url: "http://naver.com/"
  },
  {
    from_history: true,
    managed: false,
    title: "YouTube",
    url: "https://www.youtube.com/"
  },
  {
    from_history: true,
    managed: false,
    title: "velog",
    url: "https://velog.io/"
  }
];

describe("<MostVisited/>", () => {
  it("most viewed text 확인", () => {
    render(<MostVisited topSites={mockData} />);
    screen.getByText(/most viewed/i);
  });
  it("링크 정상 동작 확인", () => {
    render(<MostVisited topSites={mockData} />);
    mockData.slice(0, 5).forEach((site) => {
      expect(screen.getByTitle(site.title)).toHaveAttribute("href", site.url);
    });
  });
  it("사이트 icon 보이는지 확인", () => {
    render(<MostVisited topSites={mockData} />);
    mockData.slice(0, 5).forEach((site) => {
      expect(screen.getByAltText(site.title)).toBeVisible();
    });
  });
});
