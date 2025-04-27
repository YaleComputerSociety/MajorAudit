
import { StudentCourse } from "@/types/user";

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

export function GetCourseColor(studentCourse: StudentCourse): string {
	if (studentCourse.is_hidden) {
		return "#fbfbfb";
	}
  return IsTermActive(studentCourse.term) ? "#F5F5F5" : "#E1E9F8";
}
