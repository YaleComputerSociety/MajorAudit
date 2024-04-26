import { Course } from "../types/TypeCourse";

export const skillsAreasColors: { [code: string]: string } = {
    Hu: '#9970AB',
    So: '#4393C3',
    Sc: '#5AAE61',
    QR: '#CC3311',
    WR: '#EC7014',
    L: '#000000',
    "Hu - Humanities & Arts": '#9970AB',
    "So - Social Sciences" : '#4393C3',
    "Sc - Sciences": '#5AAE61',
    "QR - Quantitative Reasoning": '#CC3311',
    "WR - Writing": '#EC7014',
    "L - Language": '#000000',
    ...Object.fromEntries([1, 2, 3, 4, 5].map((i) => [`L${i}`, '#888888'])),
};

export const EMPTYCOURSE: Course = { code: "N/A", title: "Title NULL", description: "No course", seasons: [], evaluation: { rating: 3, workload: 3, professor: 3}, distribution: [] };