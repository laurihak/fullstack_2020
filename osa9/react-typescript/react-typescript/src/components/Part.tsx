import React from "react";
import { CoursePart } from "./Content"

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
const Part: React.FC<{ coursePart: CoursePart }> = ({ coursePart }) => {
  console.log('courseParts in part', coursePart)

  switch (coursePart.name) {
    case "Fundamentals":
      return (
        <div>
          <p>name: {coursePart.name}</p>
          <p>exercises: {coursePart.exerciseCount}</p>
          <p>description: {coursePart.description}</p>
        </div>)
    case "Using props to pass data":
      return (
        <div>
          <p>name: {coursePart.name}</p>
          <p>exercises: {coursePart.exerciseCount}</p>
          <p>group projectCount: {coursePart.groupProjectCount}</p>
        </div>)
    case "Deeper type usage":
      return (
        <div>
          <p>name: {coursePart.name}</p>
          <p>exercise count: {coursePart.exerciseCount}</p>
          <p>description: {coursePart.description}</p>
          <p>exercise submission link: {coursePart.exerciseSubmissionLink}</p>
        </div>)
    case "Fullstack":
      return (
        <div>
          <p>name: {coursePart.name}</p>
          <p>exercise count: {coursePart.exerciseCount}</p>
          <p>description: {coursePart.description}</p>
        </div>)
    default:
      return assertNever(coursePart);
  }
}

export default Part