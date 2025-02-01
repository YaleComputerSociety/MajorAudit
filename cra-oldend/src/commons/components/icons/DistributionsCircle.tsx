
import * as d3 from "d3";
import { useMemo } from "react";
import { List } from "lodash";
import { skillsAreasColors } from "../../utilities/constants";

function getData(distributions: List<string>){
  const pieData = [];
  for (let i = 0; i < distributions.length; i++) {
    pieData.push({ name: distributions[i], value: 1 });
  }
  return pieData;
}

const width = 12;
const height = 12;

export default function DistributionCircle(props: { distributions: List<string> }){

  const radius = Math.min(width, height) / 2;
  const data = getData(props.distributions);

  const pie = useMemo(() => {
    const pieGenerator = d3.pie<{ name: string; value: number }>().value((d) => d.value);
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
    <div style={{ position: "relative" }}>
      <svg width={width} height={height} style={{ display: "inline-block" }}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          {arcs.map((arc, i) => (
            <path key={i} d={arc} fill={skillsAreasColors[props.distributions[i]]} />
          ))}
        </g>
      </svg>
    </div>
  );
}
