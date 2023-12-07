import React from "react"
import chroma from "chroma-js"
import { Badge } from "react-bootstrap"
import { skillsAreasColors } from "../Constants"
import styles from "./SkillBadge.module.css"

export default function SkillBadge({ text, hidden }) {

    var skill = text.substring(0, 2).replace(" ", "");
    return (
        <Badge
            variant="secondary"
            bg={chroma(skillsAreasColors[skill]).alpha(0.16).css()}
            className={styles.tag}
            style={{
                color: skillsAreasColors[skill],
                backgroundColor: chroma(skillsAreasColors[skill]).alpha(0.16).css(),
                opacity: hidden ? 0 : 1
            }}
        >
            {text}
        </Badge>
    )
}
