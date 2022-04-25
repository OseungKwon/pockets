import { useState, useEffect } from "react";
import * as d3 from "d3";

function search(url) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    chrome.history.getVisits(
      {
        url: url
      },
      resolve
    );
  });
}

const useHistory = (topSites) => {
  const [arr, setArr] = useState([]);
  const createPie = d3
    .pie()
    .value((d) => d.value)
    .sort(null);

  useEffect(() => {
    async function fetchData() {
      const data = [];

      // eslint-disable-next-line no-undef
      for (let i = 0; i < topSites.length; i++) {
        await search(topSites[i].url).then((el) =>
          data.push({
            title: topSites[i].title,
            url: topSites[i].url,
            value: el.length
          })
        );
      }

      setArr(data);
    }
    fetchData();
  }, [topSites]);

  return [arr, createPie];
};

export default useHistory;
