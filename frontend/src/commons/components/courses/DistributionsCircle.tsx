
import { useMemo } from "react";

import * as d3 from "d3";

import { List } from "lodash";
import { Tooltip } from "react-tooltip";
import ReactDOMServer from 'react-dom/server';


import { skillsAreasColors } from "../../utilities/constants";
import DistributionBoxSmall from "./DistributionBoxSmall";


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

// function CourseDistributionsText(props: { distributions: List<string>}) {
//   const rows = [];
//   for(let i = 0; i < props.distributions.length; i++) {
//     rows.push(<DistributionBoxSmall text={props.distributions[i]}/>);
//   }
//   return (
//     <div>Satisfies {rows} Requirement{props.distributions.length > 1 ? "s" : ""}</div>
//   );
// }

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
    <div
      // data-tooltip-id="distribution-tooltip"
      // data-tooltip-html={ReactDOMServer.renderToStaticMarkup(<CourseDistributionsText distributions={distributions}/>)}
      // data-tooltip-place="top"
    >
    <div style={{position: "relative", float: "right"}}>
      <svg width={width} height={height} style={{ display: "inline-block" }}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          {arcs.map((arc, i) => {
            return (<path key={i} d={arc} fill={skillsAreasColors[distributions[i]]}/>);
          })}
        </g>
      </svg>
    </div>
    {/* <Tooltip id="distribution-tooltip" style={{ backgroundColor: "#444444", borderRadius: "3px"}}/> */}
    </div>
  );
}
