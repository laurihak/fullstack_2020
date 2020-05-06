import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick} >{props.text}</button>
  )
}

function indexOfMax(arr) {
  if (arr.length === 0) {
      return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
          maxIndex = i;
          max = arr[i];
      }
  }

  return maxIndex;
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const random = Math.floor((Math.random() * (anecdotes.length)))
  console.log(votes);
  
  
  const setToSelected = (newValue) => {
    setSelected(newValue)
  }
  const voteToSelected = (taulukko,index) => {
    const copy = [...taulukko]
    copy[index]++
    setVotes(copy)
  }
  //oneliner maksimin indeksin selvittämiseksi
  //let max = votes.indexOf(Math.max(...votes));
  //tai funktio
  let max = indexOfMax(votes)
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Button handleClick={() => setToSelected(random)} text="Next anecdote" anecdotes={anecdotes} />
      <Button handleClick={() => voteToSelected(votes,selected)} text="Vote for anecdote" anecdotes={anecdotes} /><br></br>
      {props.anecdotes[selected]}<br></br>
      has votes: {votes[selected]}
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[max]}<br></br>
      has votes: {votes[max]}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]



ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)