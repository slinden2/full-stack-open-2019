import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const DisplayVoteCount = ({ selected, points }) => <p>has {points[selected]} votes</p>

const DisplayAnecdote = ({ text, selected, anecdotes }) => {
  return (
    <>
      <h1>{text}</h1>
      <p>{anecdotes[selected]}</p>
    </>
  )
}

const DisplayMostVotes = ({ text, anecdotes, points }) => {
  const mostVotes = Object.keys(points).reduce((a, b) => points[a] > points[b] ? a : b)

  // Tarkastetaan, että onko millä tahansa anekdootilla pisteitä.
  for (const key in points) {
    if (points[key] !== 0) {
      break
    } else return ""
  }

  return (
    <>
      <h1>{text}</h1>
      <p>{anecdotes[mostVotes]}</p>
      <DisplayVoteCount selected={mostVotes} points={points} />
    </>
  )
}

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0})

  const nextAnectode = () => {
    const max = anecdotes.length - 1
    let value = Math.round(Math.random() * max)
    while (value === selected) value = Math.round(Math.random() * max)
    setSelected(value)
  }

  const vote = () => {
    const copy = { ...points }
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <>
      <DisplayAnecdote text="Anecdote of the day" anecdotes={anecdotes} points={points} selected={selected} />
      <DisplayVoteCount selected={selected} points={points} />
      <span>
        <Button text="vote" handleClick={vote} />
        <Button text="next anectode" handleClick={nextAnectode}/>
      </span>
      <DisplayMostVotes text="Anecdote with most votes" anecdotes={anecdotes} points={points} />
    </>
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