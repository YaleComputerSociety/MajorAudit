
import { useState } from "react";

import NavStyle from "./../../navbar/NavBar.module.css";
import LogoMA from "./../../commons/images/ma_logo.png";

import Style from "./Onboard.module.css";

function NavBar(){
  return(
    <div className={NavStyle.NavBar}>
      <div style={{ marginLeft: "20px" }}>
        <img src={LogoMA} alt="" style={{ width: "150px", height: "auto" }}/>
      </div>
    </div>
  );
}

function OptionOne(){
	const [inputText, setInputText] = useState('');
	const [parsedData, setParsedData] = useState<any>({});

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
			setInputText(event.target.value);
	};

	const handleClick = () => {
			const data = parseData(inputText);
			setParsedData(data);
	};

	const parseData = (input: string) => {
			const nameMatch = input.match(/Name\s*\n\s*([^\n]+)/);
			const degreeMatch = input.match(/Degree\s*\n\s*([^\n]+)/);
			const placementLanguageMatch = input.match(/Placement Language\s*([^,]+,[^,]+)/);
			const majorMatch = input.match(/Major\s*(.*?)\s*Cohort/);

			const courses = parseCourses(input);

			return {
					name: nameMatch ? nameMatch[1].split(',')[1].trim() : '',
					degree: degreeMatch ? degreeMatch[1].trim() : '',
					placementLanguage: placementLanguageMatch ? placementLanguageMatch[1].trim() : '',
					major: majorMatch ? majorMatch[1].trim() : '',
					courses: courses,
			};
	};

	const parseCourses = (input: string) => {
    const coursePattern = /([A-Z&]{3,4}\s\d{3}J?)\s+[^\n]+\s+([A-F][+-]?|IP)\s+\(?(\d)\)?\s+([^\n]+)/g;
    const courses = [];
    const courseSet = new Set();
    let match;

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

    // Group courses by term
    const groupedCourses = courses.reduce((acc, course) => {
        (acc[course.term] = acc[course.term] || []).push(course);
        return acc;
    }, {} as { [term: string]: typeof courses });

    // Sort terms in chronological order
    const sortedTerms = Object.keys(groupedCourses).sort((a, b) => {
        const [termA, yearA] = a.split(' ');
        const [termB, yearB] = b.split(' ');

        if (yearA !== yearB) {
            return parseInt(yearA) - parseInt(yearB);
        }

        const termOrder = ['Spring', 'Fall'];
        return termOrder.indexOf(termA) - termOrder.indexOf(termB);
    });

    // Reorder groupedCourses according to sortedTerms
    const sortedGroupedCourses = sortedTerms.reduce((acc, term) => {
        acc[term] = groupedCourses[term];
        return acc;
    }, {} as { [term: string]: typeof courses });

    return sortedGroupedCourses;
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
			<div style={{ marginTop: "20px" }}>
					<pre style={{ whiteSpace: 'pre-wrap', border: '1px solid black', padding: '10px', borderRadius: "4px" }}>
							{JSON.stringify(parsedData, null, 2)}
					</pre>
			</div>
	</div>
);
};

function OptionTwo(){
	return(
		<div style={{ border: "1px solid green"}}>
			Input
		</div>
	)
}

function Onboard(props: { setAuth: Function }){
	
  return(
    <div>
			<NavBar/>
			<div className={Style.OnboardContainer} style={{ border: "1px solid blue"}}>
				Welsome To MajorAudit
				<div className={Style.Row}>
					<OptionOne/>
					<OptionTwo/>
				</div>
			</div>
    </div>
  );
}

export default Onboard;
