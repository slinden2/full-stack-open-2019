import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({ text }) => <h1>{text}</h1>

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>
}

const Statistic = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({ stats }) => {

  if (stats.total === 0) {
    return (
      <>
        <Title text="statistiikka" />
        <p>Ei yhtään palautetta annettu</p>
      </>
    )
  }

  return (
    <>
      <Title text="statistiikka" />
      <table>
        <tbody>
          <Statistic text="hyvä" value={stats.good} />
          <Statistic text="neutraali" value={stats.neutral} />
          <Statistic text="huono" value={stats.bad} />
          <Statistic text="yhteensä" value={stats.total} />
          <Statistic text="keskiarvo" value={stats.avg} />
          <Statistic text="positiivisia" value={stats.positive} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad

  const stats = {
    good,
    neutral,
    bad,
    total: good + neutral + bad,
    avg: total === 0 ? 0 : (good - bad) / total,
    positive: total === 0 ? 0 : `${good / total * 100} %`
  }

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <>
      <Title text="anna palautetta" />
      <span>
        <Button text="hyvä" handleClick={handleGoodClick} />
        <Button text="neutraali" handleClick={handleNeutralClick} />
        <Button text="huono" handleClick={handleBadClick} />
      </span>
      <Statistics stats={stats} />
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)