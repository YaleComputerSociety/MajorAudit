import { React, useState } from "react";
import styles from "./../NavBar.module.css"
import MeDropdown from "../../../navbar/account/MeDropdown";
import img_logo from "./../../../commons/images/ma_logo.png"
import { NavLink } from "react-router-dom";
import { local } from "d3";

const programs = [{
  ID: 1,
  text: 'Computer Science'
},
{
  ID: 2,
  text: 'History'
},
{
  ID: 3,
  text: 'Economics'
},
{
  ID: 4,
  text: 'Political Science'
}];

function NavBar() {
  let [myPrograms, setPrograms] = useState([]);
  let programCount = 0;

  if (localStorage.getItem("programCount"))
  {
    programCount = JSON.parse(localStorage.getItem("programCount"));
  }

  if (myPrograms.length > 0 || programCount == 0) {
    localStorage.setItem('theProgramList', JSON.stringify(myPrograms));
  }

  const storedPrograms = localStorage.getItem("theProgramList");
  if (storedPrograms) {
    if (JSON.parse(storedPrograms).length > 0) {
      myPrograms = JSON.parse(storedPrograms);
    }
  } else {
    localStorage.setItem('theProgramList', JSON.stringify(myPrograms));
  }


  function List(props) {
    const filteredData = programs.filter((el) => {
      if (props.input === "") {
        return el;
      }
      else {
        return el.text.toLowerCase().includes(props.input)
      }
    })

    // fix so it only retracts drop drown list when not scrolling/clicking
    // window.onmousedown = function (e) {
    //     if (!e.target.matches('.NavBar')) {
    //         var myDropdown = document.getElementById("list");
    //         if (myDropdown.style.display === "block") {
    //             myDropdown.style.display = "none";
    //         }
    //     }
    // }

    let programHandler = (e, name) => {
      var myDropdown = document.getElementById("list");
      if (myDropdown.style.display === "block") {
        myDropdown.style.display = "none";
        if (myPrograms.length !== 2) {
          setPrograms([...myPrograms, name.toUpperCase()]);
          programCount = myPrograms.length + 1;
          localStorage.setItem('programCount', JSON.stringify(programCount));      
        }
      }
    };

    return (
      <div className={styles.list} id="list">
        {filteredData.map((item) => (
          <div key={item.id} className={styles.item} onClick={(e) => programHandler(e, item.text)}>{item.text}</div>
        ))}
      </div>
    )
  }

  function SearchBar() {

    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
      var lowerCase = e.target.value.toLowerCase();
      setInputText(lowerCase);
    };

    let visibilityHandler = (e) => {
      document.getElementById("list").style.display = "block";
    }

    let programRemover = (e, name) => {
      setPrograms(l => { return l.filter(item => item !== name)});
      programCount = myPrograms.length - 1;
      localStorage.setItem('programCount', JSON.stringify(programCount));
    };


    return (
      <div className={styles.column}>
        <div className={styles.container}>
          <input type="text"
            placeholder="Search for a major or certificate!"
            onChange={inputHandler}
            onFocus={visibilityHandler}
            className={styles.search}
            id="search"
          />
          <List input={inputText} />
        </div>
        <div className={styles.row}>
          <div className={styles.subheading}>PINNED</div>
          {myPrograms.map(program => (
            <div className={styles.program} key={myPrograms.indexOf(program)}>
              <button className={styles.close} onClick={(e) => programRemover(e, program)}>✕</button>
              {program}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.NavBar}>
      <div style={{ marginLeft: "20px" }}>
        <img
          src={img_logo}
          alt=""
          style={{ width: "150px", height: "auto", marginRight: "10px" }}
        />
      </div>
      <SearchBar />
      <div className={styles.row} style={{ marginRight: "20px" }}>
        <NavLink
          to="/graduation"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.dormantLink
          }
        >
          Graduation
        </NavLink>
        <NavLink
          to="/courses"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.dormantLink
          }
        >
          Courses
        </NavLink>
        <NavLink
          to="/majors"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.dormantLink
          }
        >
          Majors
        </NavLink>
        <MeDropdown />
      </div>
    </div>
  );
}


export default NavBar;