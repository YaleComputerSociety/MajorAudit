import { Major } from "../../../commons/types";
import Courses from "../../Courses";

export const MockData: Major = {
  metadata: {
    name: "Computer Science",
    abbreviation: "CPSC",
    stats: {
      courses: 12,
      rating: 4.0,
      workload: 3.8,
      type: "QR",
    },
    students: 91,
    about:
      "The Computer Science major is an engaging and dynamic field of study that delves into the complexities of power, governance, and public affairs. It encourages students to critically analyze political systems, philosophies, and behaviors...",
    dus: {
      name: "Y. Richard Yang",
      address: "AKW 208 432-6400",
      email: "cpsc.yale.edu",
    },
    catologLink: "Major Catalog link goes here",
    wesbiteLink: "http://cpsc.yale.edu",
  },
  requirements: [
    {
      name: "CORE",
      coursesCompleted: 1,
      coursesTotal: 5,
      subsections: [
        {
          courses: [{ name: "CPSC 201" }],
        },
        {
          courses: [{ name: "CPSC 202" }, { name: "MATH 244" }],
        },
        {
          courses: [{ name: "CPSC 223" }],
        },
        {
          courses: [{ name: "CPSC 323" }],
        },
        {
          courses: [
            { name: "CPSC 365" },
            { name: "CPSC 366" },
            { name: "CPSC 368" },
          ],
        },
      ],
    },
    {
      name: "ELECTIVES",
      coursesCompleted: 2,
      coursesTotal: 8,
      description:
        "Usually, courses with course numbers above 300 work for this requirement.",
      subsections: [
        {
          courses: [{ name: "LING 385" }, { name: "NSCI 258" }],
        },
      ],
    },
    {
      name: "SENIOR REQUIREMENT",
      coursesCompleted: 0,
      coursesTotal: 1,
      subsections: [
        {
          name: "Capstone",
          courses: [{ name: "CPSC 490" }],
        },
      ],
    },
  ],
};
