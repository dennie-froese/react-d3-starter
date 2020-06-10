import React, { useEffect, useRef } from "react";
import { select, scaleLinear, extent } from "d3";

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

function Scatter() {
  const ref = useRef(null);

  const data = RandomData();
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

  useEffect(() => {
    const g = select(ref.current);

    const xScale = scaleLinear()
      .domain(extent(data, d => d.x))
      .range([0, width]);

    const yScale = scaleLinear()
      .domain(extent(data, d => d.y))
      .range([height, 0]);

    g.selectAll(".circles")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 3)
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("fill", "black");
  }, [data, height, width]);

  return (
    <div>
      <svg width={w} height={h}>
        <g ref={ref} transform={`translate(${margin.left},${margin.top})`}></g>
      </svg>
    </div>
  );
}

export default Scatter;
