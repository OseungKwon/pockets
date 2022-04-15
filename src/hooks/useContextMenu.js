/* eslint-disable no-undef */
import { useState, useRef, useEffect } from "react";

const useContextMenu = () => {
  const [open, setOpen] = useState(false);

  const [elementData, setElementData] = useState({
    top: "",
    left: "",
    className: "",
    id: ""
  });
  const modalRef = useRef();

  const onContextMenu = (e) => {
    e.preventDefault();
    setOpen(true);
    setElementData({
      left: e.clientX,
      top: e.clientY,
      className: e.target.className,
      id: e.target.id
    });
    console.log(e);
  };

  const handleClickOutside = ({ target }) => {
    if (open && !modalRef.current.contains(target)) {
      setOpen(false);
      setElementData({ top: "", left: "", className: "", id: "" });
    }
  };

  const onRemoveBookmark = () => {
    if (elementData.className.includes("bookmark")) {
      if (window.confirm("북마크 삭제"))
        chrome.bookmarks.remove(elementData.id);
    } else if (elementData.className.includes("folder")) {
      if (window.confirm("폴더 삭제")) chrome.bookmarks.remove(elementData.id);
    }
    setOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    if (open) {
      window.addEventListener("click", handleClickOutside);
      return () => {
        window.removeEventListener("click", handleClickOutside);
      };
    }
  });

  return [open, elementData, modalRef, onContextMenu, onRemoveBookmark];
};

export default useContextMenu;
