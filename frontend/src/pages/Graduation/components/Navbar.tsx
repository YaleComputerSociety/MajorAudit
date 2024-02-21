import React, { useState }  from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import Logo from "./Logo";
import styles from "./Navbar.module.css";

export default function Header() {
  const [navExpanded, setNavExpanded] = useState<boolean>(false);
  const location = useLocation();
  return (
    <div className={styles.stickyNavbar}>
      <Container fluid className="p-0">
        <Navbar
          expanded={navExpanded}
          onToggle={(expanded: boolean) => setNavExpanded(expanded)}
          expand="md"
          className="shadow-sm px-3 align-items-start"
          style={
            location.pathname === "/graduation"
              ? {
                  height: "88px",
                  paddingBottom: "0px",
                }
              : undefined
          }
        >
          <Nav className={clsx(styles.navLogo, "navbar-brand")}>
            <NavLink
              to="/"
              style={({ isActive }) =>
                isActive
                  ? {
                      textDecoration: "none",
                      display: "table-cell",
                      verticalAlign: "middle",
                    }
                  : {}
              }
            >
              {/* Condense logo if on home page */}
              <span className={styles.navLogo}>
                <Logo icon={false} />
              </span>
            </NavLink>
          </Nav>
        </Navbar>
      </Container>
    </div>
  );
}
