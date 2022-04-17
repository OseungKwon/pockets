import { useState, useRef, useEffect } from "react";

const defaultData = {
  top: "",
  left: "",
  className: "",
  id: ""
};

const removeConfirm = (type, id) => {
  // eslint-disable-next-line no-undef
  if (window.confirm(`${type} 삭제`)) chrome.bookmarks.remove(id);
};

const useContextMenu = () => {
  const [isOpen, setOpen] = useState(false);
  const [elementData, setElementData] = useState(defaultData);
  const modalRef = useRef();

  // context menu 활성화
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

  // context menu 바깥 클릭
  const onClickOutside = ({ target }) => {
    if (isOpen && !modalRef.current.contains(target)) {
      setOpen(false);
      setElementData(defaultData);
    }
  };

  // 북마크 삭제
  const onRemoveB = () => {
    if (elementData.className.includes("bookmark")) {
      removeConfirm("북마크", elementData.id);
    }
    if (elementData.className.includes("folder")) {
      // eslint-disable-next-line no-undef
      removeConfirm("폴더", elementData.id);
    }
    setOpen(false);
    window.location.reload();
  };

  // context menu는 우클릭하면 보여짐
  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", onClickOutside);
      return () => {
        window.removeEventListener("click", onClickOutside);
      };
    }
  });

  return [isOpen, elementData, modalRef, onContextMenu, onRemoveB];
};

export default useContextMenu;
