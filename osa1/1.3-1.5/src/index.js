import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return (<h1>{props.kurssi}</h1>);
};

const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0].name} exercices={props.parts[0].exercices} />
      <Part name={props.parts[1].name} exercices={props.parts[1].exercices} />
      <Part name={props.parts[2].name} exercices={props.parts[2].exercices} />
    </div>
  );
};
const Part = (props) => {
  return (<p>{props.name} {props.exercices}</p>);
};

const Total = (props) => {
  console.log(props);
  console.log(props.parts[0].exercises);
  return (<p>Tehtävien lukumäärä kurssilla: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>);
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));