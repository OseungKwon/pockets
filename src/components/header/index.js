import React from "react";

// style
import { TitleIcon, Title } from "./style";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <Title>
      <TitleIcon>
        <FontAwesomeIcon icon={faFolderOpen} data-testid="titleIcon" />
      </TitleIcon>
      Pocket
    </Title>
  );
};

export default Header;
