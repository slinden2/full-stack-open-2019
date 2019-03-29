import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => <h1>{props.course.name}</h1>

const Content = (props) => {
  return (
    <>
      <Part course={props.course.parts[0]} />
      <Part course={props.course.parts[1]} />
      <Part course={props.course.parts[2]} />
    </>
  )
}

const Part = (props) => {
  return (
      <p>
        {props.course.name} {props.course.excercises}
      </p>
  )
}

const Total = (props) => {
  return (
    <p>
      yhteensä {props.course.parts[0].excercises + 
                props.course.parts[1].excercises + 
                props.course.parts[2].excercises} tehtävää
    </p>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
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
  }

  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))