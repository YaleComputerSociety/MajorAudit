import { React, useState } from "react";
import styles from "./../NavBar.module.css"

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

function List(props) {
    const filteredData = programs.filter((el) => {
        if (props.input === "") {
            return el;
        }
        else {
            return el.text.toLowerCase().includes(props.input)
        }
    })
    let programHandler = (e) => {
        if (!e.target.matches('.list')) {
            var myDropdown = document.getElementById("list");
            if (myDropdown.style.display === "block") {
                myDropdown.style.display = "none";
            }
        }
    };
    return (
        <div className={styles.list} id="list">
            {filteredData.map((item) => (
                <div key={item.id} className={styles.item} onClick={programHandler}>{item.text}</div>
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
        // document.getElementById("list").classList.toggle("show");
    }
    // fix so list is not visible when search bar is not clicked
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

export default SearchBar;