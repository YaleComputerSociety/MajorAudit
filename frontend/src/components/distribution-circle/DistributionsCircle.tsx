
import * as d3 from "d3";
import { useMemo } from "react";

const skillsAreasColors: { [code: string]: string } = {
  Hu: "#9970AB",
  So: "#4393C3",
  Sc: "#5AAE61",
  QR: "#CC3311",
  WR: "#EC7014",
  L: "#000000",
  "Hu - Humanities & Arts": "#9970AB",
  "So - Social Sciences": "#4393C3",
  "Sc - Sciences": "#5AAE61",
  "QR - Quantitative Reasoning": "#CC3311",
  "WR - Writing": "#EC7014",
  "L - Language": "#000000",
  ...Object.fromEntries([1, 2, 3, 4, 5].map((i) => [`L${i}`, "#888888"])),
};

function getData(distributions: string[]) {
  return distributions.map((name) => ({ name, value: 1 }));
}

const width = 12;
const height = 12;

export default function DistributionCircle(props: { distributions: string[] }) 
{
	if(props.distributions.length == 0){
    return <div/>;
  }

  const radius = Math.min(width, height) / 2;
  const data = useMemo(() => getData(props.distributions), [props.distributions]);

  const pie = useMemo(() => {
    const pieGenerator = d3.pie<{ name: string; value: number }>().value((d: { name: string; value: number }) => d.value);
    return pieGenerator(data);
  }, [data]);

  const arcs = useMemo(() => {
    const arcPathGenerator = d3.arc();
    return pie.map((p: d3.PieArcDatum<{ name: string; value: number }>): string | null =>
      arcPathGenerator({
        innerRadius: 0,
        outerRadius: radius,
        startAngle: p.startAngle,
        endAngle: p.endAngle,
      })
    );
  }, [radius, pie]);

  return (
    <div style={{ position: "relative" }}>
      <svg width={width + 2} height={height + 2} viewBox={`0 0 ${width + 2} ${height + 2}`} style={{ display: "inline-block", overflow: "visible" }}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          {arcs.map((arc: string | null, i: number) =>
            arc ? <path key={i} d={arc} fill={skillsAreasColors[props.distributions[i]]} /> : null
          )}
        </g>
      </svg>
    </div>
  );
}
