/* eslint-disable no-undef */
import { useState, useEffect } from "react";

const useItems = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [folders, setFolders] = useState([]);
  const [topSites, setTopSites] = useState([]);

  // 북마크, 폴더 가져와 처리
  useEffect(() => {
    async function fetchData() {
      const folder = [];
      const bookmark = [];

      // 전체 북마크 가져옴
      await chrome.bookmarks.getTree(function (bmTree) {
        bmTree.forEach(function (node) {
          processNode(node);
        });
      });
      setBookmarks(bookmark);
      setFolders(folder);

      function processNode(node) {
        // 폴더
        if (node.children) {
          let temp = {
            title: node.title,
            id: node.id,
            parentId: node.parentId
          };
          folder.push(temp);

          node.children.forEach(processNode);
        }
        // 북마크
        if (node.url) {
          let temp = {
            title: node.title,
            id: node.id,
            parentId: node.parentId,
            url: node.url
          };
          bookmark.push(temp);
        }
      }
    }
    fetchData();
  }, []);

  // most viewed 사이트 가져오기
  useEffect(() => {
    const topSite = [];
    chrome.topSites.get(top_site);

    function top_site(urls) {
      topSite.push(...urls);
    }

    setTopSites(topSite);
  }, []);

  return [bookmarks, folders, topSites];
};

export default useItems;
