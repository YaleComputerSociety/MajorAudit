
"use client";
import { useState, useEffect, useRef } from "react";
import Style from "./MetaInputs.module.css";

const languageList: string[] = ["Spanish", "French", "German", "Chinese", "Japanese", "Italian", "Latin", "Greek"];
const levelList: string[] = ["L1", "L2", "L3", "L4", "L5"];

function LanguagePlacement(){ 
  const [languageDropdownVisible, setLanguageDropdownVisible] = useState(false);
  const [levelDropdownVisible, setLevelDropdownVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const levelDropdownRef = useRef<HTMLDivElement>(null);

  // Click outside handler
  const handleClickOutside = (event: MouseEvent) => {
    if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
      setLanguageDropdownVisible(false);
    }
    if (levelDropdownRef.current && !levelDropdownRef.current.contains(event.target as Node)) {
      setLevelDropdownVisible(false);
    }
  };

  // Attach event listener when dropdowns are open
  useEffect(() => {
    if (languageDropdownVisible || levelDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [languageDropdownVisible, levelDropdownVisible]);
	
  return (
    <div className={Style.Row}>
      <div className={Style.InputContainer}>
        <div className={Style.Label}>Language Placement:</div>
        <div ref={languageDropdownRef} className={Style.LanguageLevelBox} style={{ width: "85px", marginRight: "5px" }} onClick={() => setLanguageDropdownVisible(!languageDropdownVisible)}>
          {selectedLanguage}
          {languageDropdownVisible && (
            <div className={Style.LanguageLevelOptions} style={{ width: "85px" }}>
              {languageList.map((lang, index) => (
                <div key={index} onClick={() => { setSelectedLanguage(lang); setLanguageDropdownVisible(false); }} className={lang === selectedLanguage ? Style.SelectedLanguageLevel : ""}>
                  {lang}
                </div>
              ))}
            </div>
          )}
        </div>
        <div ref={levelDropdownRef} className={Style.LanguageLevelBox} style={{ width: "30px" }} onClick={() => setLevelDropdownVisible(!levelDropdownVisible)}>
          {selectedLevel}
          {levelDropdownVisible && (
            <div className={Style.LanguageLevelOptions} style={{ width: "30px" }}>
              {levelList.map((level, index) => (
                <div key={index} onClick={() => { setSelectedLevel(level); setLevelDropdownVisible(false); }} className={level === selectedLevel ? Style.SelectedLanguageLevel : ""}>
                  {level}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



function FirstShelf() {
  const [formData, setFormData] = useState({
    name: "",
    gradYear: "",
    languagePlacement: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={Style.Row}>
      <div className={Style.InputContainer} style={{ marginRight: "14px" }}>
				<div className={Style.Label}>
					Name 
				</div>
        <input style={{ width: "60px" }} type="text" name="name" value={formData.name} onChange={handleChange} className={Style.InputBox}/>
      </div>
      <div className={Style.InputContainer} style={{ marginRight: "14px" }}>
			<div className={Style.Label}>
					Year 
				</div>
        <input style={{ width: "40px" }} type="text" name="gradYear" value={formData.gradYear} onChange={handleChange} className={Style.InputBox}/>
      </div>
      <LanguagePlacement/>
    </div>
  );
}

export default FirstShelf;