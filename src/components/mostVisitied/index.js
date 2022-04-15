import React from "react";
import styled from "styled-components";
import { H2, Container } from "../common/style";
const Space = styled.div`
  flex: 2 2 4rem;
  padding: 1rem;
  overflow: scroll;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;

const Icon = styled.img`
  padding: 0.5rem;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  &:hover {
    background-color: #eee;
    transition: 0.1s cubic-bezier(0, 0, 0.2, 1);
  }
`;

const MostVisited = ({ topSites }) => {
  return (
    <Container>
      <H2>most viewed</H2>
      <Space>
        {topSites.slice(0, 5).map((topSite) => (
          <a
            href={topSite.url}
            title={topSite.title}
            target="_blank"
            rel="noreferrer"
          >
            <Icon src={"chrome://favicon/size/36@1x/" + topSite.url} alt="" />
          </a>
        ))}
      </Space>
    </Container>
  );
};

export default MostVisited;
