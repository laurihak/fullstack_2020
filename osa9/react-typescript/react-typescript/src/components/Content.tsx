import React from "react";
import Part from "./Part"

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseSecond extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartBaseSecond {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseSecond {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}
interface CoursePartFour extends CoursePartBaseSecond {
  name: "Fullstack";
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

interface CourseParts {
  courseParts: {
    name: string;
    exerciseCount: number;
  }[];
}
const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <>
      {courseParts.map(p => <Part key={p.name} coursePart={p} />)}
    </>
  )
}

export default Content