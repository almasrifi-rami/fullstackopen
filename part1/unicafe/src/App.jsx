import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )

}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}


const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const weightedSum = good - bad
  
  if (all === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={all} />
          <StatisticLine text='average' value={weightedSum / all} />
          <StatisticLine text='positive' value={`${good / all * 100} %`} />
      </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [ feedback, setFeedback ] = useState({
    good: 0, neutral: 0, bad: 0})

  const { good, neutral, bad } = feedback
  
  const handleGood = () => setFeedback({ ...feedback, good: good + 1 })
  const handleNeutral = () => setFeedback({ ...feedback, neutral: neutral + 1 })
  const handleBad = () => setFeedback({ ...feedback, bad: bad + 1 })

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App