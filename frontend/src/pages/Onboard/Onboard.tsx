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
        const speed = 100; // typing speed in milliseconds

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
            <div>
                <textarea
                    rows={8}
                    cols={40}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    className={Style.TextArea}
                />
            </div>
            <div>
                <button onClick={handleClick} className={Style.btn}>
                    Parse
                </button>
            </div>
        </div>
    );
}

function OptionTwo(props: OptionTwoProps) {
    const { parsedData, handleRemoveCourse, handleParsedData } = props;
    const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);
    const [editingCourse, setEditingCourse] = useState<string | null>(null);
    const [tempCourseCode, setTempCourseCode] = useState<string>('');

    const getSeasonIcon = (term: string) => {
        if (term.toLowerCase().includes('fall')) {
            return fallIcon;
        } else if (term.toLowerCase().includes('spring')) {
            return springIcon;
        }
        return undefined;
    };

    const displayCourses = (year: string, term: string) => {
        if (!parsedData.courses[year] || !parsedData.courses[year][term]) return null;
        return parsedData.courses[year][term].map((course: DACourse, index: number) => (
            <div
                key={index}
                className={`${Style.courseBox} ${
                    course.status === 'COMPLETE' ? Style.completeCourse : Style.inProgressCourse
                }`}
                onMouseEnter={() => setHoveredCourse(course.code)}
                onMouseLeave={() => setHoveredCourse(null)}
            >
                <img src={getSeasonIcon(term)} alt="" className={Style.seasonIcon} />
                <div className={Style.courseContent}>
                    {editingCourse === course.code ? (
                        <input
                            type="text"
                            value={tempCourseCode}
                            onChange={(e) => setTempCourseCode(e.target.value)}
                            onBlur={() => handleCourseCodeChange(course)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleCourseCodeChange(course);
                            }}
                            className={Style.courseCodeInput}
                            autoFocus
                        />
                    ) : (
                        <span
                            className={`${Style.courseCode} ${hoveredCourse === course.code ? Style.courseCodeHover : ''}`}
                            onClick={() => handleCourseCodeEdit(course.code)}
                        >
                            {course.code}
                        </span>
                    )}
                </div>
                {hoveredCourse === course.code && (
                    <span
                        className={Style.removeCourse}
                        onClick={() => handleRemoveCourse(year, term, course.code)}
                    >
                        ✕
                    </span>
                )}
            </div>
        ));
    };

    const handleCourseCodeEdit = (courseCode: string) => {
        setEditingCourse(courseCode);
        setTempCourseCode(courseCode);
    };

    const handleCourseCodeChange = (course: DACourse) => {
        course.code = tempCourseCode;
        setEditingCourse(null);
        handleParsedData(parsedData);
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
                </div>
                <div style={{ marginBottom: '20px' }}></div> {/* Add gap between Fall and Spring */}
                <div className={Style.courseRow}>
                    {displayCourses(springYear, 'Spring')}
                </div>
            </div>
        );
    };

    const determineSchoolYears = (parsedData: any) => {
        if (!parsedData.courses) {
            return {
                Freshman: '',
                Sophomore: '',
                Junior: '',
                Senior: ''
            };
        }
        
        const years = Object.keys(parsedData.courses).map(year => parseInt(year)).sort();
        const firstYear = years[0] || 0; // Default to 0 if no years are present
        return {
            Freshman: firstYear ? `${firstYear}-${firstYear + 1}` : '',
            Sophomore: firstYear ? `${firstYear + 1}-${firstYear + 2}` : '',
            Junior: firstYear ? `${firstYear + 2}-${firstYear + 3}` : '',
            Senior: firstYear ? `${firstYear + 3}-${firstYear + 4}` : ''
        };
    };

    const schoolYears = determineSchoolYears(parsedData);

    return (
        <div className={Style.CourseDisplayBox}>
            {schoolYears.Freshman && getCoursesBySchoolYear('Freshman', schoolYears.Freshman)}
            {schoolYears.Sophomore && getCoursesBySchoolYear('Sophomore', schoolYears.Sophomore)}
            {schoolYears.Junior && getCoursesBySchoolYear('Junior', schoolYears.Junior)}
            {schoolYears.Senior && getCoursesBySchoolYear('Senior', schoolYears.Senior)}
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
    const [tempName, setTempName] = useState(parsedData.name);

    const formRef = useRef<HTMLDivElement>(null);

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
        const newCourse = { code: newCourseCode, credits: '3', term, status: newCourseStatus === 'Complete' ? 'COMPLETE' : 'IP' };
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

    const handleNameChange = () => {
        setEditingName(false);
        parsedData.name = tempName;
        handleParsedData(parsedData);
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
                            onChange={(e) => setTempName(e.target.value)}
                            onBlur={handleNameChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleNameChange();
                            }}
                            className={Style.nameInput}
                            autoFocus
                        />
                    ) : (
                        <span
                            className={Style.name}
                            onClick={() => setEditingName(true)}
                        >
                            {parsedData.name}
                        </span>
                    )}
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
            <div ref={formRef} className={`${Style.AddCourseContainer} ${showAddCourseForm ? Style.show : ''}`}>
                <form onSubmit={handleFormSubmit} className={Style.AddCourseForm}>
                    <input
                        type="text"
                        placeholder="Course Code"
                        value={newCourseCode}
                        onChange={(e) => setNewCourseCode(e.target.value)}
                        required
                        className={Style.courseCodeInput}
                    />
                    <select
                        value={newCourseTerm}
                        onChange={(e) => setNewCourseTerm(e.target.value)}
                        required
                        className={Style.termSelect}
                    >
                        <option value="" disabled>Select Term</option>
                        {Array.from({ length: 9 }, (_, i) => 2020 + i).flatMap(year => [
                            <option key={`Fall ${year}`} value={`Fall ${year}`}>{`Fall ${year}`}</option>,
                            <option key={`Spring ${year}`} value={`Spring ${year}`}>{`Spring ${year}`}</option>
                        ])}
                    </select>
                    <select
                        value={newCourseStatus}
                        onChange={(e) => setNewCourseStatus(e.target.value)}
                        required
                        className={Style.statusSelect}
                    >
                        <option value="Complete">Complete</option>
                        <option value="In Progress (IP)">In Progress (IP)</option>
                    </select>
                </form>
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
            <button 
                onClick={handleAddButtonClick}
                className={`${Style.AddCourseButton} ${isFormValid ? Style.validForm : ''}`}
            >
                +
            </button>
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
                    &nbsp;data into MajorAudit. <br /> <br /> 
                    Select (ctrl + A) and copy (ctrl + C) the whole page. <br/> <br/> 
                    Paste in the box to the right and click parse.
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
                    Welcome to MajorAudit! <br /> <br />
                    If you're curious how we use your data, check out our&nbsp; 
                    <a href="http://127.0.0.1:3000/privacy" target="_blank" rel="noopener noreferrer" className={Style.Link}>privacy policy</a>.
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
                        </button>
                    </div>
                </div>
            </div>
            <div className={Style.Padder}></div>
        </div>
    );
}

export default Onboard;