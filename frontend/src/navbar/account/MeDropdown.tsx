import React from "react";
import { NavLink } from "react-router-dom";
import { Row, Col, Collapse } from "react-bootstrap";
import type { IconType } from "react-icons";
import { BsFillPersonFill } from "react-icons/bs";
import { FcInfo, FcQuestions, FcNews } from "react-icons/fc";
import { FaSignOutAlt } from "react-icons/fa";
import clsx from "clsx";

import styles from "./MeDropdown.module.css";
import {
  scrollToTop,
  useComponentVisible,
} from "../../commons/utilities/display";
import { SurfaceComponent, TextComponent, HoverText } from "../Typography";

function DropdownItem({
  icon: Icon,
  iconColor,
  children,
  to,
  href,
  externalLink,
  onClick,
}: {
  readonly icon: IconType;
  readonly iconColor?: string;
  readonly children: string;
  readonly to?: string;
  readonly href?: string;
  readonly externalLink?: boolean;
  readonly onClick?: (e: React.MouseEvent) => void;
}) {
  const innerText = (
    <div className={styles.innerText}>
      <HoverText>
        <Icon
          className="mr-2 my-auto"
          size={20}
          style={{ paddingLeft: "2px", paddingBottom: "3px" }}
          color={iconColor}
        />
      </HoverText>
      <div>{children}</div>
    </div>
  );
  return (
    <Row className="pb-3 m-auto">
      <TextComponent type="secondary">
        {to ? (
          <NavLink
            to={to}
            className={styles.collapseText}
            onClick={onClick ?? scrollToTop}
          >
            {innerText}
          </NavLink>
        ) : href ? (
          // eslint-disable-next-line react/jsx-no-target-blank
          <a
            href={href}
            className={styles.collapseText}
            {...(externalLink && {
              target: "_blank",
              rel: "noreferrer noopener",
            })}
          >
            {innerText}
          </a>
        ) : onClick ? (
          <button
            type="button"
            onClick={onClick}
            className={styles.collapseText}
          >
            {innerText}
          </button>
        ) : (
          <span className={styles.collapseText}>{innerText}</span>
        )}
      </TextComponent>
    </Row>
  );
}

function DropdownContent({
  isExpanded,
  setIsExpanded,
}: {
  readonly isExpanded: boolean;
  readonly setIsExpanded: (visible: boolean) => void;
}) {
  return (
    <SurfaceComponent
      className={styles.collapseContainer}
      onClick={() => {
        setIsExpanded(false);
      }}
      style={{
        display: isExpanded ? "flex" : "none",
      }}
    >
      <Collapse in={isExpanded}>
        {/* This wrapper div is important for making the collapse animation
          smooth */}
        <div>
          <Col className="px-3 pt-3">
            <DropdownItem icon={FcInfo} to="/about">
              About
            </DropdownItem>
            {/*
            <DropdownItem icon={FcNews} to="/releases">
              Release Notes
            </DropdownItem>
        */}
            <DropdownItem icon={FcQuestions} to="/faq">
              FAQ
            </DropdownItem>
            <DropdownItem icon={FaSignOutAlt} iconColor="#ed5f5f">
              Sign Out
            </DropdownItem>
          </Col>
        </div>
      </Collapse>
    </SurfaceComponent>
  );
}

function MeDropdown() {
  // Ref to detect outside clicks for profile dropdown
  const { elemRef, isComponentVisible, setIsComponentVisible } =
    useComponentVisible<HTMLButtonElement>(false);
  return (
    <div className={clsx(styles.navbarMe, "align-self-end")}>
      <button
        type="button"
        ref={elemRef}
        className={clsx(styles.meIcon, "m-auto")}
        onClick={() => setIsComponentVisible(!isComponentVisible)}
        aria-label="Profile"
      >
        <BsFillPersonFill
          className="m-auto"
          size={20}
          color={isComponentVisible ? "#007bff" : undefined}
        />
      </button>
      <DropdownContent
        isExpanded={isComponentVisible}
        setIsExpanded={setIsComponentVisible}
      />
    </div>
  );
}

export default MeDropdown;
