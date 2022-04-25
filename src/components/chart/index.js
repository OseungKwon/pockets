import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { useSelector } from "react-redux";
import { Svg, FocusText, FocusTitle } from "./style";
import Arc from "./arc";

const Chart = ({ topSites }) => {
  const [arr, setArr] = useState([]);
  const focusUrl = useSelector((state) => state.slice.focusUrl);
  const createPie = d3
    .pie()
    .value((d) => d.value)
    .sort(null);
  const colors = ["#ffcfcf", "#cfffe2", "#cfd1ff", "#cfe4ff", "#fff4cc"];

  useEffect(() => {
    async function fetchData() {
      const data = [];
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

      console.log(data.sort((a, b) => b.value - a.value));
      setArr(data);
    }
    fetchData();
  }, []);

  return (
    <Svg>
      <g transform={`translate(120 120)`}>
        {arr.length > 0 &&
          createPie(arr.slice(0, 5)).map((d, i) => (
            <Arc key={i} data={d} index={i} colors={colors} />
          ))}
        <FocusTitle y="-8" x="0" textAnchor="middle">
          {focusUrl.title}
        </FocusTitle>
        <FocusText y="15" x="0" textAnchor="middle">
          {focusUrl.viewCount} visited
        </FocusText>
      </g>
    </Svg>
  );
};

export default Chart;
