import { useState } from "react";
import { onboardUser } from "../../api/api";

import NavStyle from "./../../navbar/NavBar.module.css";
import LogoMA from "./../../commons/images/ma_logo.png";

import Style from "./Onboard.module.css";

type DACourse = {
  code: string;
  credits: string;
  term: string;
  status: string;
};

function NavBar() {
  return (
    <div className={NavStyle.NavBar}>
      <div style={{ marginLeft: "20px" }}>
        <img src={LogoMA} alt="" style={{ width: "150px", height: "auto" }} />
      </div>
    </div>
  );
}

function OptionOne(props: { handleParsedData: Function }) {
  const [inputText, setInputText] = useState('');
  const [parsedData, setParsedData] = useState<any>({});

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  const handleClick = () => {
    const data = parseData(inputText);
    setParsedData(data);
    props.handleParsedData(data);
  };

  const parseData = (input: string) => {
    const nameMatch = input.match(/Name\s*\n\s*([^\n]+)/);
    const courses = parseCourses(input);

    const degreeMatch = input.match(/Degree\s*\n\s*([^\n]+)/);
    const majorMatch = input.match(/Major\s*(.*?)\s*Cohort/);

    const placementLanguageMatch = input.match(/Placement Language\s*([^,]+,[^,]+)/);

    let degreeList: Array<string> = [];
    if (degreeMatch && majorMatch) {
      degreeList = [`${degreeMatch[1].trim()} ${majorMatch[1].trim()}`];
    }

    return {
      name: nameMatch ? nameMatch[1].split(',')[1].trim() : '',
      degrees: degreeList,
      courses: groupCoursesByYear(courses),
      language: placementLanguageMatch ? placementLanguageMatch[1].trim() : '',
    };
  };

  const parseCourses = (input: string) => {
    const coursePattern = /([A-Z&]{3,4}\s\d{3}J?)\s+[^\n]+\s+([A-F][+-]?|IP)\s+\(?(\d)\)?\s+([^\n]+)/g;
    const courses = [];
    const courseSet = new Set<string>();
    let match: RegExpExecArray | null;

    while ((match = coursePattern.exec(input)) !== null) {
      const courseCode = match[1].trim();
      const status = match[2].trim() === 'IP' ? 'IP' : 'COMPLETE';
      if (!courseSet.has(courseCode)) {
        const course = {
          code: courseCode,
          credits: match[3].trim(),
          term: match[4].trim(),
          status: status,
        };
        courses.push(course);
        courseSet.add(courseCode);
      }
    }
    return courses;
};

// u can use this for better data rendering, although I rly dont fuck w the dynamic DACourse typing, deprecate that shit
	// const groupCourses = (courses: DACourse[]): { [term: string]: DACourse[] } => {
	// 	// Group courses by term
	// 	const groupedCourses = courses.reduce((acc, course) => {
	// 			(acc[course.term] = acc[course.term] || []).push(course);
	// 			return acc;
	// 	}, {} as { [term: string]: DACourse[] });

	// 	// Sort terms in chronological order
	// 	const sortedTerms = Object.keys(groupedCourses).sort((a, b) => {
	// 			const [termA, yearA] = a.split(' ');
	// 			const [termB, yearB] = b.split(' ');

	// 			if (yearA !== yearB) {
	// 					return parseInt(yearA) - parseInt(yearB);
	// 			}

	// 			const termOrder = ['Spring', 'Fall'];
	// 			return termOrder.indexOf(termA) - termOrder.indexOf(termB);
	// 	});

	// 	// Reorder groupedCourses according to sortedTerms
	// 	const sortedGroupedCourses = sortedTerms.reduce((acc, term) => {
	// 			acc[term] = groupedCourses[term];
	// 			return acc;
	// 	}, {} as { [term: string]: DACourse[] });

	// 	return sortedGroupedCourses;
	// };

	const syncAndGo = async () => {
		console.log(parsedData);
		await onboardUser(parsedData);
		props.checkAuth();
	};

  return (
    <div style={{ border: "1px solid black", borderRadius: "8px", padding: "10px" }}>
      <div>
        <textarea
          rows={8}
          cols={40}
          onChange={handleChange}
          placeholder="Paste DegreeAudit data here..."
          style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
        />
      </div>
      <div>
        <button onClick={handleClick} style={{ marginTop: '10px' }}>
          Parse
        </button>
      </div>
    </div>
  );
}

function OptionTwo(props: { parsedData: any }) {
  const { parsedData } = props;

  return (
    <div className={Style.CourseDisplayBox}>
      {Object.keys(parsedData.courses || {}).map((year) => (
        <div key={year}>
          <h2 className={Style.YearHeader}>{year}</h2>
          {parsedData.courses[year].map((course: DACourse, index: number) => (
            <div key={index} className={Style.courseBox}>
              <div className={Style.courseCode}>{course.code}</div>
              <div className={Style.courseCredits}>{course.credits} Credits</div>
              <div className={Style.courseStatus}>{course.status}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function ResultsWindow(props: { parsedData: any }) {
  const [activeTab, setActiveTab] = useState<'json' | 'courses'>('json');

  return (
    <div className={Style.ResultsContainer}>
      <div className={Style.TabButtons}>
        <button onClick={() => setActiveTab('json')} className={Style.TabButton}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
          </svg>
        </button>
        <button onClick={() => setActiveTab('courses')} className={Style.TabButton}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
          </svg>
        </button>
      </div>
      <div className={Style.TabContent}>
        {activeTab === 'json' ? (
          <div style={{ height: "400px", overflowY: "scroll" }}>
            <pre style={{ whiteSpace: 'pre-wrap', border: '1px solid black', padding: '10px', borderRadius: "4px" }}>
              {JSON.stringify(props.parsedData, null, 2)}
            </pre>
          </div>
        ) : (
          <OptionTwo parsedData={props.parsedData} />
        )}
      </div>
    </div>
  );
}

function Onboard(props: { checkAuth: Function }){
	
  return(
    <div>
      <NavBar />
      <div className={Style.OnboardContainer}>
        Welcome To MajorAudit
        <div className={Style.Row}>
          <OptionOne handleParsedData={handleParsedData} />
          <ResultsWindow parsedData={parsedData} />
        </div>
      </div>
    </div>
  );
}

export default Onboard;
