import { Course } from "../types/TypeCourse";

export const skillsAreasColors: { [code: string]: string } = {
    Hu: '#9970AB',
    So: '#5493C4',
    Sc: '#67AE5E',
    QR: '#C1320A',
    WR: '#E37F1D',
    L: '#231861',
    "Hu - Humanities & Arts": '#9970AB',
    "So - Social Sciences" : '#5493C4',
    "Sc - Sciences": '#67AE5E',
    "QR - Quantitative Reasoning": '#C1320A',
    "WR - Writing": '#E37F1D',
    "L - Language": '#231861',
    ...Object.fromEntries([1, 2, 3, 4, 5].map((i) => [`L${i}`, '#888888'])),
};

export const EMPTYCOURSE: Course = { code: "N/A", title: "Title NULL", description: "No course", seasons: [], evaluation: { rating: 3, workload: 3, professor: 3}, distribution: [] };