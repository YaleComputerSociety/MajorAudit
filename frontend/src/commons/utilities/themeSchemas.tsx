import { Theme } from "../../hooks/themeContext"

interface ThemeProps {
    backgroundColor: string;
    color: string;
    courseBoxColor: string;
    courseBoxColor2: string;
    buttonColor: string;
}

const lightTheme: ThemeProps = {
    backgroundColor: "#FFFFFF",
    color: "#000000",
    courseBoxColor: "#F5F5F5",
    courseBoxColor2: "#E1E9F8",
    buttonColor: "#61ADFE",
}

const darkTheme: ThemeProps = {
    backgroundColor: "#242424",
    color: "#EEEEEE",
    courseBoxColor: "#363636",
    courseBoxColor2: "#404040",
    buttonColor: "#61ADFE",
}

const pinkTheme: ThemeProps = {
    backgroundColor: "#FFC0CB",
    color: "#000000",
    courseBoxColor: "#FF9CAD",
    courseBoxColor2: "#FF7D94",
    buttonColor: "#FF7D94",
}

const greenTheme: ThemeProps = {
    backgroundColor: "#AFE1AF",
    color: "#000000",
    courseBoxColor: "#50C878",
    courseBoxColor2: "#36AA5D",
    buttonColor: "#36AA5D",
}

const blueTheme: ThemeProps = {
    backgroundColor: "#CAF0F8",
    color: "#000000",
    courseBoxColor: "#48CAE4",
    courseBoxColor2: "#00B4D8",
    buttonColor: "#48CAE4",
}

const purpleTheme: ThemeProps = {
    backgroundColor: "#DEB7FF",
    color: "#000000",
    courseBoxColor: "#C785EC",
    courseBoxColor2: "#A86ADD",
    buttonColor: "#C785EC",
} 

interface IDictionary {
    [index: string]: ThemeProps;
}
var themeList = {} as IDictionary;
themeList['light'] = lightTheme;
themeList['dark'] = darkTheme;
themeList['pink'] = pinkTheme;
themeList['green'] = greenTheme;
themeList['blue'] = blueTheme;
themeList['purple'] = purpleTheme;

export function getThemeColor(currentTheme: Theme, themeProp: string) {
    if (themeProp === 'backgroundColor') return themeList[currentTheme].backgroundColor;
    if (themeProp === 'color') return themeList[currentTheme].color;
    if (themeProp === 'courseBoxColor') return themeList[currentTheme].courseBoxColor;
    if (themeProp === 'courseBoxColor2') return themeList[currentTheme].courseBoxColor2;
    if (themeProp === 'buttonColor') return themeList[currentTheme].buttonColor;
    return "#000000"
}