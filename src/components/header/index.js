import React, { useState } from "react";

// style
import { TitleIcon, Title, SettingIcon } from "./style";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen, faGear } from "@fortawesome/free-solid-svg-icons";
import Modal from "../modal";

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const onSetting = () => {
    setOpen(true);
  };
  return (
    <>
      <Title>
        <TitleIcon>
          <FontAwesomeIcon icon={faFolderOpen} data-testid="titleIcon" />
        </TitleIcon>
        Pocket
      </Title>
      <SettingIcon>
        <FontAwesomeIcon icon={faGear} onClick={onSetting} />
      </SettingIcon>
      {isOpen && <Modal />}
    </>
  );
};

export default Header;
