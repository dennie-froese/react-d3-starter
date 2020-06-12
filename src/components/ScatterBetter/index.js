import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import AxisY from "../AxisY";
import AxisX from "../AxisX";

function RandomData() {
  const data = [...Array(100)].map((e, i) => {
    return {
      x: Math.random() * 40,
      y: Math.random() * 40,
      temparature: Math.random() * 500
    };
  });
  return data;
}

function ScatterBetter() {
  const [data] = useState(RandomData());
  const props = useSpring({
    r: 10,
    from: { r: 0 }
  });

  const w = 600;
  const h = 600;
  const margin = {
    top: 40,
    bottom: 40,
    left: 40,
    right: 40
  };

  const width = w - margin.right - margin.left;
  const height = h - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain(extent(data, d => d.x))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain(extent(data, d => d.y))
    .range([height, 0]);

  const circles = data.map((d, i) => (
    <animated.circle
      key={i}
      r={props.r}
      cx={xScale(d.x)}
      cy={yScale(d.y)}
      style={{ fill: "purple" }}
    />
  ));

  return (
    <div
      style={{
        padding: 20,
        justifyItems: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <h1>React + D3 + React Spring</h1>
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisY yScale={yScale} width={width} />
          <AxisX xScale={xScale} height={height} />
          {circles}
        </g>
      </svg>
    </div>
  );
}

export default ScatterBetter;
