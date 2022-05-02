import React, { useState } from "react";

// d3
import * as d3 from "d3";

// redux
import { useDispatch } from "react-redux";
import { fixFocus } from "../../../store/slice/slice";

// func
import { mobileToCom } from "../../common";

// style
import { Path, Text } from "./style";

const Arc = ({ data, index, colors }) => {
  const dispatch = useDispatch();
  const [add, setAdd] = useState(0);
  const createArc = d3
    .arc()
    .innerRadius(70 + add / 2)
    .outerRadius(110 + add)
    .cornerRadius(5);

  const mouseOver = () => {
    setAdd(5);
    dispatch(fixFocus({ title: data.data.title, viewCount: data.data.value }));
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
      <a href={mobileToCom(data.data.url)} target="_blank" rel="noreferrer">
        <Path className="arc" d={createArc(data)} fill={colors[index]} />
      </a>

      <Text
        transform={`translate(${createArc.centroid(data)})`}
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize="11"
        fill="#777"
      >
        {data.data.title.length > 5
          ? `${data.data.title.slice(0, 5)}..`
          : data.data.title}
      </Text>
    </g>
  );
};

export default Arc;
