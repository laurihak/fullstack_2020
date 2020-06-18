import React from "react";

interface CourseParts {
  courseParts: {
    name: string;
    exerciseCount: number;
  }[];
}
const Total: React.FC<CourseParts> = ({ courseParts }) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

export default Total