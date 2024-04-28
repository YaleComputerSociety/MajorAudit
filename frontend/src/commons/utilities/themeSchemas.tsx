import { Theme } from "../../hooks/themeContext"

export const lightTheme = {
    backgroundColor: "#FFFFFF",
    color: "#000000",
    courseBoxColor: "#F5F5F5",
    courseBoxColor2: "#E1E9F8",
}

export const darkTheme = {
    backgroundColor: "#242424",
    color: "#EEEEEE",
    courseBoxColor: "#363636",
    courseBoxColor2: "#404040",
}

export function getThemeColor(currentTheme: Theme, themeProp: string) {
    if (currentTheme === 'light') {
        if (themeProp === 'backgroundColor') return lightTheme.backgroundColor;
        if (themeProp === 'color') return lightTheme.color;
        if (themeProp === 'courseBoxColor') return lightTheme.courseBoxColor;
        if (themeProp === 'courseBoxColor2') return lightTheme.courseBoxColor2;
    }
    if (currentTheme === 'dark') {
        if (themeProp === 'backgroundColor') return darkTheme.backgroundColor;
        if (themeProp === 'color') return darkTheme.color;
        if (themeProp === 'courseBoxColor') return darkTheme.courseBoxColor;
        if (themeProp === 'courseBoxColor2') return darkTheme.courseBoxColor2;
    }
    return "#000000"
}