import React from "react";

// func
import { mobileToCom } from "../common";

// style
import { Space, Icon } from "./style";
import { H2, Container } from "../common/style";

const MostVisited = ({ topSites }) => {
  return (
    <Container>
      <H2>most viewed</H2>
      <Space>
        {topSites.slice(0, 5).map((topSite) => (
          <a
            key={topSite.url}
            href={mobileToCom(topSite.url)}
            title={topSite.title}
            target="_blank"
            rel="noreferrer"
          >
            <Icon
              src={"chrome://favicon/size/36@1x/" + topSite.url}
              alt={topSite.title}
            />
          </a>
        ))}
      </Space>
    </Container>
  );
};

export default MostVisited;
