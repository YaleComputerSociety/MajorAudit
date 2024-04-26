import React from "react";
import MeDropdown from "../../../navbar/account/MeDropdown";
import nav_styles from "../../../commons/components/navbar/NavBar.module.css";
import img_logo from "../../../commons/images/ma_logo.png";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Card, Row } from "react-bootstrap";
import { TextComponent } from "../../../navbar/Typography";
import "./components/About.scss";

import ld from "../../../commons/images/ld_headshot.jpeg";
import lm from "../../../commons/images/lm_headshot.jpeg";
import rg from "../../../commons/images/rg_headshot.jpeg";
import og from "../../../commons/images/og_headshot.jpeg";
import ah from "../../../commons/images/ah_headshot.jpeg";
import rr from "../../../commons/images/rr_headshot.jpeg";
import bw from "../../../commons/images/bw_headshot.jpeg";
import wy from "../../../commons/images/wy_headshot.jpeg";

import githubDark from "../../../commons/images/github-light.png";
import github from "../../../commons/images/github.png";
import linkedin from "../../../commons/images/linkedin.png";
import webDark from "../../../commons/images/web-light.png";
import web from "../../../commons/images/web.png";
import styles from "./components/About.module.css";

type Person = {
  name: string;
  image: string;
  role: string;
  links?: {
    github?: string;
    linkedin?: string;
    website?: string;
  };
};

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
  const current: Person[] = [
    {
      name: "Lorenss Martinsons",
      image: lm,
      role: "MajorAudit Lead",
      links: {
        github: "https://github.com/lorenss-m",
        linkedin: "https://www.linkedin.com/in/lorenss/",
      },
    },
    {
      name: "Ryan Gumlia",
      image: rg,
      role: "Frontend Team Lead",
      links: {
        linkedin: "https://www.linkedin.com/in/ryanggumlia/",
        github: "https://github.com/ryanggum",
      },
    },
    {
      name: "Oz Gitelson",
      image: og,
      role: "Backend Team Lead",
      links: {
        linkedin: "https://www.linkedin.com/in/oz-gitelson-4b606b249/",
        github: "https://github.com/OzGitelson",
      },
    },
    {
      name: "Darwin Deng",
      image: ld,
      role: "Development",
      links: {
        linkedin: "https://www.linkedin.com/in/lejun-deng-46b437264/",
        github: "https://github.com/darwin-hub",
      },
    },
    {
      name: "Annabelle Huang",
      image: ah,
      role: "Development",
      links: {
        linkedin: "https://www.linkedin.com/in/annabellehuang/",
        github: "https://github.com/annabelle-huang",
      },
    },
    {
      name: "Ramya Reddy",
      image: rr,
      role: "Development",
      links: {
        linkedin: "https://www.linkedin.com/in/ramya-n-reddy/",
        github: "https://github.com/ramyareddy04",
      },
    },
    {
      name: "Ben Wu",
      image: bw,
      role: "Development",
      links: {
        linkedin: "https://www.linkedin.com/in/benjaminwu13/",
        github: "https://github.com/winbow13",
      },
    },
    {
      name: "Will Yang",
      image: wy,
      role: "Development",
      links: {
        linkedin: "https://www.linkedin.com/in/will-y/",
        github: "https://github.com/WillJYang",
      },
    },
  ];

  const logoLink = (
    link: string | undefined,
    image: string,
    imageDark: string,
    text: string
  ) =>
    link && (
      <a href={link}>
        <img
          src={image}
          alt={text}
          style={{
            width: "24px",
            paddingRight: "4px",
          }}
        />
      </a>
    );

  const createCards = (person: Person, idx: number) => (
    <div key={idx} className="col-lg-3 col-md-4 col-sm-6 col-12 p-2">
      <Card className={styles.card}>
        <Card.Img variant="top" src={person.image} alt={person.name} />
        <Card.Body className="p-3">
          <Card.Title className="mb-1">{person.name}</Card.Title>
          <Card.Text>
            <TextComponent type="secondary">{person.role}</TextComponent>
            <br />
            {logoLink(person.links?.github, github, githubDark, "github")}
            {logoLink(person.links?.linkedin, linkedin, linkedin, "linkedin")}
            {logoLink(person.links?.website, web, webDark, "website")}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
  return (
    <div>
      <NavBar />
      <div className="local-bootstrap">
        <div className={clsx(styles.container, "mx-auto")}>
          <div style={{ marginTop: "75px" }}>
            <h1 className={clsx(styles.title, "mt-5 mb-1")}>About Us</h1>
            <TextComponent type="secondary">
              <p className={clsx(styles.aboutDescription, "mb-3 mx-auto")}>
                CourseTable offers a clean and effective way for Yale students
                to find the courses they want, bringing together course
                information, student evaluations, and course demand statistics
                in an intuitive interface. It's run by a small team of
                volunteers within the{" "}
                <a
                  href="http://yalecomputersociety.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Yale Computer Society
                </a>{" "}
                and is completely{" "}
                <a
                  href="https://github.com/coursetable"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  open source
                </a>
                .
              </p>
              <p className={clsx(styles.aboutDescription, "mb-3 mx-auto")}>
                Also check out our <Link to="/faq">FAQ</Link> and{" "}
                <Link to="/releases">Release Notes</Link>.
              </p>
            </TextComponent>
            <h1 className="mt-3">Current Team</h1>

            <div className="my-3">
              <Row className="mx-auto">{current.map(createCards)}</Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
