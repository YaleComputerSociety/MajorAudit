import MeDropdown from "../../../navbar/account/MeDropdown";
import nav_styles from "../../../commons/components/navbar/NavBar.module.css";
import img_logo from "../../../commons/images/ma_logo.png";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Card, Row } from "react-bootstrap";
import { TextComponent } from "../../../navbar/Typography";
import ld from "../../../../images/ld_headshot.jpeg";
import githubDark from "../images/link-logos/github-light.png";
import github from "../images/link-logos/github.png";
import linkedin from "../images/link-logos/linkedin.png";
import webDark from "../images/link-logos/web-light.png";
import web from "../images/link-logos/web.png";
import styles from "../About.module.css";

function NavBar() {
  return (
    <div className={nav_styles.NavBar}>
      <div style={{ marginLeft: "20px" }}>
        <img
          src={img_logo}
          alt=""
          style={{ width: "150px", height: "auto", marginRight: "10px" }}
        />
      </div>

      <div className={nav_styles.row} style={{ marginRight: "20px" }}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? nav_styles.activeLink : nav_styles.dormantLink
          }
        >
          Graduation
        </NavLink>
        <NavLink
          to="/courses"
          className={({ isActive }) =>
            isActive ? nav_styles.activeLink : nav_styles.dormantLink
          }
        >
          Courses
        </NavLink>
        <NavLink
          to="/majors"
          className={({ isActive }) =>
            isActive ? nav_styles.activeLink : nav_styles.dormantLink
          }
        >
          Majors
        </NavLink>
        <MeDropdown />
      </div>
    </div>
  );
}

function About() {
  return (
    <div>
      <NavBar />
    </div>
  );
}

export default About;
