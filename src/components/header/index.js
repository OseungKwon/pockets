import React, { useState, useEffect } from "react";

// style
import { TitleIcon, Title, SettingIcon } from "./style";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen, faGear } from "@fortawesome/free-solid-svg-icons";
import Modal from "../modal";

import { useDispatch, useSelector } from "react-redux";
import { changeModalState } from "../../store/slice/slice";

const Header = () => {
  const isOpen = useSelector((state) => state.slice.isModalOpen);
  console.log(isOpen);
  const dispatch = useDispatch();
  const onSetting = () => {
    dispatch(changeModalState(true));
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
