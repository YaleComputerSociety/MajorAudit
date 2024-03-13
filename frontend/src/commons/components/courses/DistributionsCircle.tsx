import { List } from "lodash";
import React, { useMemo } from "react";
import * as d3 from "d3";
import { skillsAreasColors } from "../../utilities/constants";

type Props = {
  readonly distributions: List<string>;
};

function getData({ distributions }: Props) {
  const pieData = [];
  for (let i = 0; i < distributions.length; i++) {
    pieData.push({ name: distributions[i], value: 1 });
  }
  return pieData;
}

type DataItem = {
  name: string;
  value: number;
};

const width = 12;
const height = 12;

export default function DistributionCircle({ distributions }: Props) {
  const radius = Math.min(width, height) / 2;
  const data = getData({ distributions });

  const pie = useMemo(() => {
    const pieGenerator = d3.pie<any, DataItem>().value((d) => d.value);
    return pieGenerator(data);
  }, [data]);

  const arcs = useMemo(() => {
    const arcPathGenerator = d3.arc();
    return pie.map(
      (p) =>
        arcPathGenerator({
          innerRadius: 0,
          outerRadius: radius,
          startAngle: p.startAngle,
          endAngle: p.endAngle,
        }) as any
    );
  }, [radius, pie]);

  return(
    <div style={{position: "relative", float: "right", paddingLeft: "2px"}}>
      <svg width={width} height={height} style={{ display: "inline-block" }}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          {arcs.map((arc, i) => {
            return (<path key={i} d={arc} fill={skillsAreasColors[distributions[i]]}/>);
          })}
        </g>
      </svg>
    </div>
  );
}
