import React from 'react'

const Header = ({ course: { name } }) => <h1>{name}</h1>

const Total = ({ course: { parts } }) => {
  const total = parts.reduce((result, item) => result + item.exercises, 0)
  return <p>yhteensä {total} tehtävää</p>
}

const Part = ({ part }) =>
  <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => (
  <div>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </div>
)

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
    </>
  )
}

const Courses = ({ courses }) => {
  return (
    courses.map(course => {
      return (
        <div key={course.id}>
          <Course course={course} />
          <Total course={course} />
        </div>
      )
    })
  )
}

export default Courses