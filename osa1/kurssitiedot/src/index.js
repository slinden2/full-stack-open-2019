import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part courseData={props.courseData[0]} />
      <Part courseData={props.courseData[1]} />
      <Part courseData={props.courseData[2]} />
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.courseData.name} {props.courseData.excercises}
      </p>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>yhteensä {props.courseData[0].excercises + 
                   props.courseData[1].excercises + 
                   props.courseData[2].excercises} tehtävää</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  const courseData = [
    {
      name: 'Reactin perusteet',
      excercises: 10
    },
    {
      name: 'Tiedonvälitys propseilla',
      excercises: 7
    },
    {
      name: 'Komponenttien tila',
      excercises: 14
    }
  ]

  return (
    <>
      <Header course={course} />
      <Content courseData={courseData}  />
      <Total courseData={courseData} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))