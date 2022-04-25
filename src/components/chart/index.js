import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import styled from "styled-components";

const Path = styled.path`
  cursor: pointer;
  transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
`;

const Text = styled.text`
  transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
`;

const Arc = ({ data, index, colors }) => {
  const [add, setAdd] = useState(0);
  const createArc = d3
    .arc()
    .innerRadius(50 + add / 2)
    .outerRadius(100 + add)
    .cornerRadius(5);

  const mouseOver = () => {
    setAdd(5);
  };
  const mouseOut = () => {
    setAdd(0);
  };

  return (
    <g
      key={index}
      className="arc"
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
    >
      <Path className="arc" d={createArc(data)} fill={colors[index]} />
      <Text
        transform={`translate(${createArc.centroid(data)})`}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="#555"
        fontSize="10"
      >
        {data.data.title.length > 10
          ? `${data.data.title.slice(0, 7)}..`
          : data.data.title}
      </Text>
    </g>
  );
};

const Chart = ({ topSites }) => {
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

      console.log(data);
    }
    fetchData();
  }, []);

  return <svg width={500} height={500}></svg>;
};

export default Chart;
