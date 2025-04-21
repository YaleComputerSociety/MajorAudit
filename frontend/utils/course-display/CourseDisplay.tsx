
import Style from "./CourseDisplay.module.css";
import Image from "next/image";
import { StudentCourse } from "@/types/type-user";

export function TransformTermNumber(term: number | string): string {
  const termStr = term.toString();
  if (termStr.length !== 6) {
    return "Invalid term format";
  }

  const year = termStr.substring(0, 4);
  const seasonCode = termStr.substring(4, 6);

  let season = "";
  switch (seasonCode) {
    case "01":
      season = "Spring";
      break;
    case "02":
      season = "Summer";
      break;
    case "03":
      season = "Fall";
      break;
    default:
      return "Invalid term format";
  }

  return `${season} ${year}`;
}

export function IsTermActive(term: string): boolean {
	return true;
  const currentYearMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"

  const termStr = String(term);
  if (termStr.length !== 6) return true; // Treat invalid term formats as ended

  const year = termStr.slice(0, 4); // Extract year (YYYY)
  const season = termStr.slice(4, 6); // Extract season (01, 02, or 03)

  // Define the cutoff month for each season
  const seasonCutoff: { [key: string]: string } = {
    "01": `${year}-06`, // Spring ends in June
    "02": `${year}-09`, // Summer ends in September
    "03": `${Number(year) + 1}-01`, // Fall ends in January of next year
  };

  return currentYearMonth < seasonCutoff[season];
}

export function GetCourseColor(term: string): string {
  return IsTermActive(term) ? "#F5F5F5" : "#E1E9F8";
}

export function RenderMark(props: { status: string })
{
	if(props.status === "DA"){
    return(
      <div className={Style.Checkmark}>
        ✓
      </div>
    );
  }else 
	if(props.status === "MA"){
    return(
			<div className={Style.Checkmark}>
				⚠
			</div>
    );
  }
  return <div></div>;
}

export function SeasonIcon(props: { studentCourse: StudentCourse })
{
	const getSeasonImage = () => (String(props.studentCourse.term).endsWith("3") ? "/fall.svg" : "/spring.svg");
	return(
		<div>
			<Image className={Style.SeasonImage} src={getSeasonImage()} alt="" width={20} height={20}/>
		</div>
	)
}
