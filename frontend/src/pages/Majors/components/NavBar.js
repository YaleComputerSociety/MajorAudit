import { React, useState } from "react";
import styles from "./../NavBar.module.css"
import MeDropdown from "../../../navbar/account/MeDropdown";
import img_logo from "./../../../commons/images/ma_logo.png"
// import img_logo from "./../../commons/images/ma_logo.png";
import { NavLink } from "react-router-dom";

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
  const [myPrograms, setPrograms] = useState([]);

  function List(props) {
    const filteredData = programs.filter((el) => {
        if (props.input === "") {
            return el;
        }
        else {
            return el.text.toLowerCase().includes(props.input)
        }
    })
    let programHandler = (e, name) => {
        // if (!e.target.matches('.item')) {
            var myDropdown = document.getElementById("list");
            if (myDropdown.style.display === "block") {
                myDropdown.style.display = "none";
                if (myPrograms.length !== 2)
                {
                  setPrograms([...myPrograms, { id: programs.length, name: name.toUpperCase() }]);
                }
            }
        // }
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
    // window.onmousedown = function (e) {
    //     if (!e.target.matches('.list')) {
    //         var myDropdown = document.getElementById("list");
    //         if (myDropdown.style.display === "block") {
    //             myDropdown.style.display = "none";
    //         }
    //     }
    // }
    return (
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
        <div className={styles.column}>
          <SearchBar/>
          <div className ={styles.row}>
            <div className={styles.subheading}>PINNED</div>
            {myPrograms.map(program => (
                <div className={styles.program} key={program.id}>{program.name}</div>
            ))}
          </div>
        </div>
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