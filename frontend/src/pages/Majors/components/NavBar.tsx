import { useState } from "react";

import NavStyle from "./../NavBar.module.css"

import MeDropdown from "../../../navbar/account/MeDropdown";
import logo from "./../../../commons/images/ma_logo.png"
import PageLinks from "./../../../navbar/PageLinks";

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


// function SearchBar(){

// 	const [inputText, setInputText] = useState("");
// 	let inputHandler = (e) => {
// 		var lowerCase = e.target.value.toLowerCase();
// 		setInputText(lowerCase);
// 	};

// 	let visibilityHandler = (e) => {
// 		document.getElementById("list").style.display = "block";
// 	}
// 	return (
// 		<div className={styles.container}>
// 			<input type="text"
// 				placeholder="Search for a major or certificate!"
// 				onChange={inputHandler}
// 				onFocus={visibilityHandler}
// 				className={styles.search}
// 				id="search"
// 			/>
// 			<List input={inputText} />
// 		</div>
// 	);
// }

// function NavBar() {
//   let [myPrograms, setPrograms] = useState([]);
//   // localStorage.removeItem("theProgramList");

//   const storedPrograms = localStorage.getItem("theProgramList");

//   if (myPrograms.length > 0)
//   {
//     localStorage.setItem('theProgramList', JSON.stringify(myPrograms));
//   }

//   if (storedPrograms) {
//     myPrograms = JSON.parse(storedPrograms);
//   }

  
//   // function List(props) {
//   //   const filteredData = programs.filter((el) => {
//   //     if (props.input === "") {
//   //       return el;
//   //     }
//   //     else {
//   //       return el.text.toLowerCase().includes(props.input)
//   //     }
//   //   })

//   //   // fix so it only retracts drop drown list when not scrolling/clicking
//   //   // window.onmousedown = function (e) {
//   //   //     if (!e.target.matches('.NavBar')) {
//   //   //         var myDropdown = document.getElementById("list");
//   //   //         if (myDropdown.style.display === "block") {
//   //   //             myDropdown.style.display = "none";
//   //   //         }
//   //   //     }
//   //   // }

//   //   // let programHandler = (e, name) => {
//   //   //   var myDropdown = document.getElementById("list");
//   //   //   if (myDropdown.style.display === "block") {
//   //   //     myDropdown.style.display = "none";
//   //   //     if (myPrograms.length !== 2) {
//   //   //       setPrograms([...myPrograms, name.toUpperCase()]);
//   //   //     }
//   //   //   }
//   //   // };

//   //   return (
//   //     <div className={styles.list} id="list">
//   //       {filteredData.map((item) => (
//   //         <div key={item.id} className={styles.item} onClick={(e) => programHandler(e, item.text)}>{item.text}</div>
//   //       ))}
//   //     </div>
//   //   )
//   // }

//   return (
//     <div className={NavStyle.NavBar}>
//       <div style={{ marginLeft: "20px" }}>
//         <img src={img_logo} alt="" style={{ width: "150px", height: "auto", marginRight: "10px" }}/>
//       </div>

//       <div className={NavStyle.column}>
//         <SearchBar/>
//         <div className={NavStyle.row}>
//           <div className={NavStyle.subheading}>
// 						PINNED
// 					</div>
//           {myPrograms.map(program => (
//             <div className={NavStyle.program} key={myPrograms.indexOf(program)}>{program}</div>
//           ))}
//         </div>
//       </div>

// 			<PageLinks/>
//     </div>
//   );
// }

function NavBar() {
  return (
    <div className={NavStyle.NavBar}>
      <div style={{ marginLeft: "20px" }}>
        <img src={logo} alt="" style={{ width: "150px", height: "auto", marginRight: "10px" }}/>
      </div>
      <PageLinks/>
    </div>
  );
}


export default NavBar;