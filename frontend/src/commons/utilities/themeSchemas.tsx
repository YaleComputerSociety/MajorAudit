import { Theme } from "../../hooks/themeContext"

export const lightTheme = {
    background: "#FFFFFF",
    textColor: "#000000",
    courseBoxColor: "#F5F5F5",

}

export const darkTheme = {
    background: "#242424",
    textColor: "#EEEEEE",
    courseBoxColor: "#363636",
}

export function getThemeColor(theme: Theme, themeProp: string) {
    if (theme === 'light') {
        if (themeProp === 'background') return lightTheme.background;
        if (themeProp === 'textColor') return lightTheme.textColor;
        if (themeProp === 'courseBoxColor') return lightTheme.courseBoxColor;
    }
    if (theme === 'dark') {
        if (themeProp === 'background') return darkTheme.background;
        if (themeProp === 'textColor') return darkTheme.textColor;
        if (themeProp === 'courseBoxColor') return darkTheme.courseBoxColor;
    }
}