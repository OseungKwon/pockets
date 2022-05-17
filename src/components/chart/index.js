import React from "react";

// redux
import { useSelector } from "react-redux";

// style
import { Svg, FocusText, FocusTitle } from "./style";

// components
import Arc from "./arc";

// hooks
import useHistory from "../../hooks/useHistory";

const Chart = ({ topSites }) => {
  const [arr, createPie] = useHistory(topSites);
  console.log("slice", arr);
  const focusUrl = useSelector((state) => state.slice.focusUrl);

  const colors = ["#ffcfcf", "#cfffe2", "#cfd1ff", "#cfe4ff", "#fff4cc"];

  return (
    <Svg data-testid="d3Chart">
      <g transform={`translate(120 120)`}>
        {arr.length > 0 &&
          createPie(arr.slice(0, 5)).map((d, i) => (
            <Arc key={i} data={d} index={i} colors={colors} />
          ))}
        <FocusTitle y="-8" x="0" textAnchor="middle" data-testid="focusTitle">
          {focusUrl.title}
        </FocusTitle>
        <FocusText y="15" x="0" textAnchor="middle" data-testid="focusText">
          {focusUrl.viewCount} visited
        </FocusText>
      </g>
    </Svg>
  );
};

export default Chart;
