import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text} : {props.value} {props.unit}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const all = props.feedbacks[0] + props.feedbacks[1] + props.feedbacks[2]
  const average = (1.0 * props.feedbacks[0] + 0.0 * props.feedbacks[1] + -1.0 * props.feedbacks[2]) / all;
  const positive = props.feedbacks[0] / all;

  if (all > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={props.feedbacks[0]} />
          <StatisticLine text="neutral" value={props.feedbacks[1]} />
          <StatisticLine text="bad" value={props.feedbacks[2]} />

          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} unit={"%"}/>
        </tbody>
      </table>
    )
  }

  return(
    <div>
      No feedbacks yet.
    </div>
  )
}




const App = props => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad;
  const average = (1.0 * good + 0.0 * neutral + -1.0 * bad) / all;
  const positive = good / all;

  const setToValueGood = newValue => {
    setGood(newValue)
  }
  const setToValueNeutral = newValue => {
    //console.log(neutral)
    setNeutral(newValue)
  }
  const setToValueBad = newValue => {
    setBad(newValue)
  }

  return (

    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setToValueGood(good + 1)} text="good" />
      <Button handleClick={() => setToValueNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToValueBad(bad + 1)} text="bad" />
      <h2>Statistics</h2>
      <Statistics feedbacks={[good,neutral,bad]} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)