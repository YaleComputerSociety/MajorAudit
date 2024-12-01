import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { onboardUser } from "../../api/api";
import NavStyle from "./../../navbar/NavBar.module.css";
import LogoMA from "./../../commons/images/ma_logo.png";
import Style from "./Onboard.module.css";
import fallIcon from "./../../commons/images/fall.png";
import springIcon from "./../../commons/images/spring.png";
import { debounce } from "lodash";

type DACourse = {
    code: string;
    credits: string;
    term: string;
    status: string;
};

type OptionTwoProps = {
    parsedData: any;
    handleRemoveCourse: (year: string, term: string, courseCode: string) => void;
    handleParsedData: (data: any) => void;
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

function OptionOne(props: { checkAuth: Function, handleParsedData: Function, onParse: Function }) {
    const [inputText, setInputText] = useState('');
    const [parsedData, setParsedData] = useState<any>({});
    const [placeholder, setPlaceholder] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const indexRef = useRef(0);
    const textRef = useRef("Paaste DegreeAudit data here...");
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const blinkIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const text = textRef.current;
        const speed = 50; // typing speed in milliseconds

        const typeWriter = () => {
            if (indexRef.current < text.length) {
                setPlaceholder((prev) => prev + text.charAt(indexRef.current));
                indexRef.current += 1;
                typingTimeoutRef.current = setTimeout(typeWriter, speed);
            } else {
                setIsTyping(false);
                blinkCursor();
            }
        };

        typeWriter();

        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            if (blinkIntervalRef.current) {
                clearInterval(blinkIntervalRef.current);
            }
        };
    }, []);

    const blinkCursor = () => {
        blinkIntervalRef.current = setInterval(() => {
            setPlaceholder((prev) =>
                prev.endsWith('|') ? prev.slice(0, -1) : prev + '|'
            );
        }, 500);
    };

    const handleFocus = () => {
        setIsFocused(true);
        setPlaceholder(placeholder.replace('|', '')); // Remove the blinking cursor
        if (blinkIntervalRef.current) {
            clearInterval(blinkIntervalRef.current);
        }
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (!inputText) {
            blinkCursor();
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(event.target.value);
        setPlaceholder(''); // Clear the placeholder when user starts typing
        setIsTyping(false); // Stop the blinking cursor
        if (blinkIntervalRef.current) {
            clearInterval(blinkIntervalRef.current);
        }
    };

    const handleClick = () => {
        const data = parseData(inputText);
        setParsedData(data);
        props.handleParsedData(data);
        props.onParse(); // Trigger the scroll effect
    };

    const containsYaleCollege = inputText.includes("Yale College");


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

        const firstCourseYear = courses.length ? parseInt(courses[0].term.split(' ')[1], 10) : new Date().getFullYear();
        const classYear = (firstCourseYear + 3).toString().slice(-2);

        return {
            name: nameMatch ? nameMatch[1].split(',')[1].trim() : '',
            degrees: degreeList,
            courses: groupCoursesByYear(courses),
            language: placementLanguageMatch ? placementLanguageMatch[1].trim() : '',
            classYear,
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

    const groupCoursesByYear = (courses: DACourse[]) => {
        const groupedCourses: { [year: string]: { [term: string]: DACourse[] } } = {};
        courses.forEach(course => {
            const [term, year] = course.term.split(' ');
            if (!groupedCourses[year]) {
                groupedCourses[year] = { Fall: [], Spring: [] };
            }
            groupedCourses[year][term].push(course);
        });
        return groupedCourses;
    };

    return (
        <div className={Style.OptionBox}>
            <div className={Style.textAreaContainer}>
                <textarea
                    rows={8}
                    cols={40}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    className={Style.TextArea}
                    value={inputText}
                />
                <button 
                    onClick={handleClick} 
                    className={`${Style.parseButton} ${containsYaleCollege ? Style.active : ''}`}
                >
                    Parse
                </button>
            </div>
        </div>
    );
}

function OptionTwo(props: OptionTwoProps) {
    const { parsedData, handleRemoveCourse, handleParsedData } = props;
    const [editingCourse, setEditingCourse] = useState<{ year: string, term: string, code: string } | null>(null);
    const [newCourseCode, setNewCourseCode] = useState<string>('');
    const [newCourseCredits, setNewCourseCredits] = useState<number>(1); // New state for credits
    const formRef = useRef<HTMLDivElement>(null);

    const getSeasonIcon = (term: string) => {
        if (term.toLowerCase().includes('fall')) {
            return fallIcon;
        } else if (term.toLowerCase().includes('spring')) {
            return springIcon;
        }
        return undefined;
    };

    const displayCourses = (year: string, term: string) => {
        if (!parsedData.courses || !parsedData.courses[year] || !parsedData.courses[year][term]) return null;
        return parsedData.courses[year][term].map((course: DACourse, index: number) => (
            <div
                key={index}
                className={`${Style.courseBox} ${
                    course.status === 'COMPLETE' ? Style.completeCourse : Style.inProgressCourse
                }`}
            >
                <img src={getSeasonIcon(term)} alt="" className={Style.seasonIcon} />
                <div className={Style.courseContent}>
                    {editingCourse?.year === year && editingCourse?.term === term && editingCourse?.code === course.code ? (
                        <input
                            type="text"
                            value={newCourseCode}
                            onChange={(e) => setNewCourseCode(e.target.value)}
                            onBlur={() => handleSaveCourseCode(year, term, course.code)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && document.activeElement !== formRef.current?.querySelector('.courseCreditsInput')) {
                                    e.preventDefault(); 
                                    handleSaveCourseCode(year, term, course.code);
                                }
                                if (e.key === 'Escape') setEditingCourse(null); // Close form on Escape
                            }}
                            className={Style.courseCodeInput}
                            autoFocus
                        />
                    ) : (
                        <span
                            className={Style.courseCode}
                            onClick={() => handleEditCourseCode(year, term, course.code, course.code)}
                        >
                            {course.code}
                        </span>
                    )}
                </div>
                <span
                    className={Style.removeCourse}
                    onClick={() => handleRemoveCourse(year, term, course.code)}
                >
                    ✕
                </span>
            </div>
        ));
    };

    const handleEditCourseCode = (year: string, term: string, code: string, currentCode: string) => {
        setEditingCourse({ year, term, code });
        setNewCourseCode(currentCode);
    };

    const handleSaveCourseCode = (year: string, term: string, oldCode: string) => {
        const courses = parsedData.courses[year][term];
        const courseIndex = courses.findIndex((course: DACourse) => course.code === oldCode);
        if (courseIndex !== -1) {
            parsedData.courses[year][term][courseIndex].code = newCourseCode.trim();
            handleParsedData(parsedData);
        }
        setEditingCourse(null);
        setNewCourseCode('');
    };

    const handleAddCourse = (year: string, term: string) => {
        if (!newCourseCode.trim()) return;

        const currentYear = new Date().getFullYear();
        const isFuture = parseInt(year) >= currentYear;
        const status = isFuture ? 'IP' : 'COMPLETE';

        const newCourse = { code: newCourseCode.trim(), credits: newCourseCredits.toString(), term, status };
        if (!parsedData.courses) {
            parsedData.courses = {};
        }
        if (!parsedData.courses[year]) {
            parsedData.courses[year] = { Fall: [], Spring: [] };
        }
        parsedData.courses[year][term].push(newCourse);

        setEditingCourse(null);
        setNewCourseCode('');
        setNewCourseCredits(1); // Reset credits
        handleParsedData(parsedData);
    };

    const handleCourseCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewCourseCode(event.target.value);
    };

    const handleCourseCreditsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);

        if (value >= 0.5 && value <= 1.5) {
            setNewCourseCredits(value);
        } else if (value < 0.5) {
            setNewCourseCredits(0.5);
        } else if (value > 1.5) {
            setNewCourseCredits(1.5);
        }
    };

    const renderPlusButton = (year: string, term: string, backgroundColor: string) => {
        return (
            <button
                onClick={() => setEditingCourse({ year, term, code: '' })}
                style={{ backgroundColor }}
                className={`${Style.addCourseButton} ${Style.circularButton}`} // Ensure button is circular
            >
                +
            </button>
        );
    };

    const getCoursesBySchoolYear = (schoolYear: string, years: string) => {
        if (!years) return null; // Return null if years is undefined
        const [fallYear, springYear] = years.split('-');
        return (
            <div key={schoolYear} className={Style.yearComponent}>
                <h2 className={Style.YearHeader}>
                    {schoolYear} <span className={Style.yearRange}>{years}</span>
                </h2>
                <div className={Style.courseRow}>
                    {displayCourses(fallYear, 'Fall')}
                    {editingCourse?.year === fallYear && editingCourse?.term === 'Fall' && !editingCourse?.code ? (
                        <div
                            ref={formRef} /* Attach the ref to the form */
                            className={`${Style.courseBox} ${Style.courseInputBox}`}
                        >
                            <img src={fallIcon} alt="" className={Style.addSeasonIcon} />
                            <input
                                type="text"
                                value={newCourseCode}
                                onChange={handleCourseCodeChange}
                                onBlur={() => handleAddCourse(fallYear, 'Fall')}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && document.activeElement !== formRef.current?.querySelector('.courseCreditsInput')) {
                                        e.preventDefault();
                                        handleAddCourse(fallYear, 'Fall');
                                    }
                                    if (e.key === 'Escape') setEditingCourse(null); // Close form on Escape
                                }}
                                className={Style.courseCodeInput}
                                placeholder="MATH 225"
                                autoFocus
                            />
                            <input
                                type="number"
                                value={newCourseCredits}
                                onChange={handleCourseCreditsChange}
                                className={Style.courseCreditsInput}
                                placeholder="1"
                                min="0.5"
                                max="1.5"
                                step="0.5"
                            />
                            <span className={Style.creditsText}>credit(s)</span>
                        </div>
                    ) : (
                        renderPlusButton(fallYear, 'Fall', '#ac2005')
                    )}
                </div>
                <div style={{ marginBottom: '20px' }}></div> {/* Add gap between Fall and Spring */}
                <div className={Style.courseRow}>
                    {displayCourses(springYear, 'Spring')}
                    {editingCourse?.year === springYear && editingCourse?.term === 'Spring' && !editingCourse?.code ? (
                        <div
                            ref={formRef} /* Attach the ref to the form */
                            className={`${Style.courseBox} ${Style.courseInputBox}`}
                        >
                            <img src={springIcon} alt="" className={Style.addSeasonIcon} />
                            <input
                                type="text"
                                value={newCourseCode}
                                onChange={handleCourseCodeChange}
                                onBlur={() => handleAddCourse(springYear, 'Spring')}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && document.activeElement !== formRef.current?.querySelector('.courseCreditsInput')) {
                                        e.preventDefault();
                                        handleAddCourse(springYear, 'Spring');
                                    }
                                    if (e.key === 'Escape') setEditingCourse(null); // Close form on Escape
                                }}
                                className={Style.courseCodeInput}
                                placeholder="MATH 225"
                                autoFocus
                            />
                            <input
                                type="number"
                                value={newCourseCredits}
                                onChange={handleCourseCreditsChange}
                                className={Style.courseCreditsInput}
                                placeholder="1"
                                min="0.5"
                                max="1.5"
                                step="0.5"
                            />
                            <span className={Style.creditsText}>credit(s)</span>
                        </div>
                    ) : (
                        renderPlusButton(springYear, 'Spring', '#6eb570')
                    )}
                </div>
            </div>
        );
    };

    const determineSchoolYears = (parsedData: any) => {
        const classYear = parsedData.classYear || '28';
        const startYear = 2000 + parseInt(classYear) - 4; // Adjusted to calculate start year based on graduation year

        return {
            Freshman: `${startYear}-${startYear + 1}`,
            Sophomore: `${startYear + 1}-${startYear + 2}`,
            Junior: `${startYear + 2}-${startYear + 3}`,
            Senior: `${startYear + 3}-${startYear + 4}`,
        };
    };

    const schoolYears = determineSchoolYears(parsedData);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                setEditingCourse(null);
            }
        };

        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setEditingCourse(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscapeKey);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [formRef]);

    return (
        <div className={Style.CourseDisplayBox}>
            {getCoursesBySchoolYear('Freshman', schoolYears.Freshman)}
            {getCoursesBySchoolYear('Sophomore', schoolYears.Sophomore)}
            {getCoursesBySchoolYear('Junior', schoolYears.Junior)}
            {getCoursesBySchoolYear('Senior', schoolYears.Senior)}
        </div>
    );
}


function ResultsWindow(props: { parsedData: any; syncAndGo: Function; handleParsedData: (data: any) => void }) {
    const { parsedData, syncAndGo, handleParsedData } = props;
    const [activeTab, setActiveTab] = useState<'json' | 'courses'>('courses');
    const [showAddCourseForm, setShowAddCourseForm] = useState(false);
    const [newCourseCode, setNewCourseCode] = useState('');
    const [newCourseTerm, setNewCourseTerm] = useState('');
    const [newCourseStatus, setNewCourseStatus] = useState('Complete');
    const [modalVisible, setModalVisible] = useState(false);
    const [courseToRemove, setCourseToRemove] = useState<{ year: string; term: string; courseCode: string } | null>(null);
    const [editingName, setEditingName] = useState(false);
    const [editingYear, setEditingYear] = useState(false);
    const [tempName, setTempName] = useState(parsedData.name || '');
    const [tempClassYear, setTempClassYear] = useState(parsedData.classYear || ''); // Default to class of '28

    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Update name and class year when parsedData changes
        if (parsedData.name) setTempName(parsedData.name);
        if (parsedData.classYear) setTempClassYear(parsedData.classYear);
    }, [parsedData]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                setShowAddCourseForm(false);
            }
        };

        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setShowAddCourseForm(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscapeKey);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [formRef]);

    const handleAddCourse = () => {
        setShowAddCourseForm(true);
    };

    const handleFormSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const [term, year] = newCourseTerm.split(' ');
        const currentYear = new Date().getFullYear();
        const isFuture = parseInt(year) >= currentYear;
        const status = isFuture ? 'IP' : 'COMPLETE';
        const newCourse = { code: newCourseCode, credits: '3', term, status };
        if (!parsedData.courses) {
            parsedData.courses = {};
        }
        if (!parsedData.courses[year]) {
            parsedData.courses[year] = { Fall: [], Spring: [] };
        }
        parsedData.courses[year][term].push(newCourse);
        setShowAddCourseForm(false);
        setNewCourseCode('');
        setNewCourseTerm('');
        setNewCourseStatus('Complete');
        handleParsedData(parsedData);
    };

    const handleRemoveCourse = (year: string, term: string, courseCode: string) => {
        setCourseToRemove({ year, term, courseCode });
        setModalVisible(true);
    };

    const confirmRemoveCourse = () => {
        if (courseToRemove) {
            const { year, term, courseCode } = courseToRemove;
            const courses = parsedData.courses[year][term];
            parsedData.courses[year][term] = courses.filter((course: DACourse) => course.code !== courseCode);
            setModalVisible(false);
            setCourseToRemove(null);
            handleParsedData(parsedData);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setCourseToRemove(null);
    };

    const saveNameAndYear = () => {
        setEditingName(false);
        setEditingYear(false);
        parsedData.name = tempName || 'Name';
        parsedData.classYear = tempClassYear || '28';
        handleParsedData(parsedData);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempName(e.target.value);
    };

    const handleClassYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newClassYear = e.target.value.slice(-2); // Keep only the last two digits
        setTempClassYear(newClassYear);
    };

    const isFormValid = newCourseCode && newCourseTerm;

    const handleAddButtonClick = () => {
        if (isFormValid) {
            handleFormSubmit();
            setShowAddCourseForm(false);
            setNewCourseCode('');
            setNewCourseTerm('');
            setNewCourseStatus('Complete');
        } else {
            handleAddCourse();
        }
    };

    return (
        <div className={Style.ResultsContainer} id="results">
            <div className={Style.Header}>
            <div className={Style.HeaderText}>
                {editingName ? (
                    <input
                        type="text"
                        value={tempName}
                        onChange={handleNameChange}
                        onBlur={saveNameAndYear}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') saveNameAndYear();
                        }}
                        className={Style.nameInput}
                        placeholder="Name"
                        style={{ width: `${tempName.length + 1}ch`, color: 'black' }} // Dynamic width matching content, keep text black
                        autoFocus
                    />
                ) : (
                    <span
                        className={Style.name}
                        onClick={() => setEditingName(true)}
                        style={{ color: "black", cursor: "pointer" }} // Keep text black
                    >
                        {tempName || <span className={Style.placeholder}>Name</span>}
                    </span>
                )}

                <span className={Style.graduationYear}>
                    {editingYear ? (
                        <span className={Style.classYearEditable}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className={Style.yearIcon}
                            >

                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                                />
                            </svg>
                            <span style={{ fontSize: '1rem', marginTop: '4px'}}>20</span>
                            <input
                                type="text"
                                value={tempClassYear}
                                onChange={handleClassYearChange}
                                onBlur={saveNameAndYear}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") saveNameAndYear();
                                }}
                                className={Style.yearInput}
                                maxLength={2}
                                placeholder="" // This acts as the placeholder for the year
                                autoFocus
                            />
                        </span>
                        
                    ) : (
                        <span
                            className={Style.classYear}
                            onClick={() => setEditingYear(true)}
                            style={{ cursor: "pointer", display: "inline-flex", alignItems: "center" }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className={Style.yearIcon}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                                />
                            </svg>
                            <span style={{ fontSize: '1rem', marginTop: '4px'}}>20</span>
                            <span
                                className={Style.classYearNum}
                            > 
                                {`${tempClassYear || "28"}`} 
                            </span> 
                        </span>
                    )}
                </span>
            </div>
                <div className={Style.TabButtons}>
                    <button onClick={() => setActiveTab('courses')} className={`${Style.TabButton} ${activeTab === 'courses' ? Style.ActiveTab : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                        </svg>
                    </button>
                    <button onClick={() => setActiveTab('json')} className={`${Style.TabButton} ${activeTab === 'json' ? Style.ActiveTab : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={Style.TabContent}>
                {activeTab === 'json' ? (
                    <div className={Style.JSONContainer}>
                        <pre className={Style.JSONPre}>
                            {JSON.stringify(parsedData, null, 2)}
                        </pre>
                    </div>
                ) : (
                    <OptionTwo parsedData={parsedData} handleRemoveCourse={handleRemoveCourse} handleParsedData={handleParsedData} />
                )}
            </div>
            
            {modalVisible && (
                <div className={Style.ModalOverlay}>
                    <div className={Style.Modal}>
                        <p>Are you sure you want to remove {courseToRemove?.courseCode}?</p>
                        <div className={Style.ModalButtons}>
                            <button onClick={confirmRemoveCourse}>Yes</button>
                            <button onClick={closeModal}>No</button>
                        </div>
                    </div>
                </div>
            )}
            {/* <button 
                onClick={handleAddButtonClick}
                className={`${Style.AddCourseButton} ${isFormValid ? Style.validForm : ''}`}
            >
                +
            </button> */}
        </div>
    );
}

type NumFlipProps = {
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

function NumFlip({ setCurrentStep }: NumFlipProps) {
    const controls = useAnimation();
    const isAnimating = useRef(false);

    const numFlipVariants = {
        one: { transform: 'translateY(0)', transition: { duration: 0.35, ease: [0.2, 0.4, 0.58, 1] } },
        two: { transform: 'translateY(-33.33%)', transition: { duration: 0.35, ease: [0.2, 0.4, 0.58, 1] } },
        three: { transform: 'translateY(-66.66%)', transition: { duration: 0.35, ease: [0.2, 0.4, 0.58, 1] } },
    };

    const handleScroll = debounce(() => {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollPosition / totalHeight;
        const step = 1 / 3; // There are 3 steps, so each step is approximately 33.33% of the scroll height

        if (!isAnimating.current) {
            if (scrollProgress < step) {
                controls.start('one');
                setCurrentStep(1);
            } else if (scrollProgress < 2 * step && scrollProgress >= step) {
                controls.start('two');
                setCurrentStep(2);
            } else {
                controls.start('three');
                setCurrentStep(3);
            }
        }
    }, 100);

    useEffect(() => {
        const handleScrollEvent = () => {
            handleScroll();
        };

        window.addEventListener('scroll', handleScrollEvent);
        return () => {
            window.removeEventListener('scroll', handleScrollEvent);
        };
    }, []);

    useEffect(() => {
        controls.start('one').then(() => isAnimating.current = false);
    }, [controls]);

    useEffect(() => {
        const handleResize = () => {
            handleScroll();
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const handleScrollEnd = debounce(() => {
            handleScroll();
        }, 50);

        window.addEventListener('scroll', handleScrollEnd);
        return () => {
            window.removeEventListener('scroll', handleScrollEnd);
        };
    }, []);

    return (
        <motion.div
            initial="one"
            animate={controls}
            variants={numFlipVariants}
            className={Style.NumFlip}
            onAnimationStart={() => isAnimating.current = true}
            onAnimationComplete={() => isAnimating.current = false}
        >
            <div>1. Parse</div>
            <div>2. Verify</div>
            <div>3. Sync</div>
        </motion.div>
    );
}

type TextFlipProps = {
    currentStep: number;
};

function TextFlip({ currentStep }: TextFlipProps) {
    const textVariants = {
        hidden: { opacity: 0, transition: { duration: 0.25 } },
        visible: { opacity: 1, transition: { delay: 0.25, duration: 0.25 } },
    };

    return (
        <div className={Style.TextFlip}>
            {currentStep === 1 && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={textVariants}
                    className={Style.TextField}
                    key={1}
                >
                    Copy and paste your&nbsp;
                    <a href="http://degreeaudit.yale.edu/" target="_blank" rel="noopener noreferrer" className={Style.Link}>DegreeAudit</a> 
                    &nbsp; data into MajorAudit. <br /> <br /> 
                    Select (ctrl + A) and copy (ctrl + C) the whole page. <br/> <br/> 
                    Paste in the box to the right and click parse.<br/> <br/> 

                    Alternatively, you may skip this step and manually enter your courses below.
                </motion.div>
            )}

            {currentStep === 2 && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={textVariants}
                    className={Style.TextField}
                    key={2}
                >
                    Make sure your class information has been correctly added! <br /> <br />
                    You can always come back and edit this at any time.
                </motion.div>
            )}

            {currentStep === 3 && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={textVariants}
                    className={Style.TextField}
                    key={3}
                >
                    Finally, sync the data to complete the onboarding process. <br /> <br />
               
                    If you're curious how we use your data, check out our&nbsp; 
                    <a href="http://127.0.0.1:3000/privacy" target="_blank" rel="noopener noreferrer" className={Style.Link}>privacy policy</a>.
                    <br /> <br />
                    Welcome to MajorAudit!
                </motion.div>
            )}
        </div>
    );
}

function Onboard(props: { checkAuth: Function }) {
    const [parsedData, setParsedData] = useState<any>({});
    const [currentStep, setCurrentStep] = useState(1);

    const handleParsedData = (data: any) => {
        console.log('Parsed data:', data);
        setParsedData(data);
    };

    const handleParse = () => {
        const element = document.getElementById('results');
        const headerOffset = 120; // Replace 70 with the actual height of your header
        const elementPosition = element?.getBoundingClientRect().top || 0;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 20; // Adding some padding

        if (element) {
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const syncAndGo = async (data: any) => {
        try {
            console.log('Syncing data:', JSON.stringify(data));
            await onboardUser(data);
            props.checkAuth();
        } catch (error) {
            console.error('Error syncing data:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
            alert('An error occurred while syncing data. Please try again.');
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const steps = document.querySelectorAll(`.${Style.Step}`);
            steps.forEach((step, index) => {
                const stepElement = step as HTMLElement;
                const offset = window.scrollY + window.innerHeight / 1.5;
                if (offset > stepElement.offsetTop) {
                    stepElement.classList.add(Style.StepVisible);
                } else {
                    stepElement.classList.remove(Style.StepVisible);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={Style.MainContainer}>
            <NavBar />
            <div className={Style.NumFullContainer}>
                <div id="zero" className={Style.Zero}>0</div>
                <div className={Style.NumContainer}>
                    <NumFlip setCurrentStep={setCurrentStep} />
                </div>
            </div>
            <div className={Style.NumFullContainer}>
                <div className={Style.TextContainer}>
                    <TextFlip currentStep={currentStep} />
                </div>
            </div>
            <div className={Style.OnboardContainer}>
                <div className={Style.LeftColumn}>
                </div>
                <div className={Style.RightColumn}>
                    <OptionOne checkAuth={props.checkAuth} handleParsedData={handleParsedData} onParse={handleParse} />
                    <div style={{ marginTop: "10vh" }}>
                        <ResultsWindow parsedData={parsedData} syncAndGo={syncAndGo} handleParsedData={handleParsedData} />
                    </div>
                    <div className={Style.syncButtonContainer}>
                    <button onClick={() => syncAndGo(parsedData)} className={Style.syncButton}>
                        Sync
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={Style.syncIcon}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </button>
                    </div>
                </div>
            </div>
            <div className={Style.Padder}></div>
        </div>
    );
}

export default Onboard;
