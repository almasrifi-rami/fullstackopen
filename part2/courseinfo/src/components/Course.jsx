const Header = ({ title }) => <h2>{title}</h2>

const Part = ({ part, exercises }) => <p>{part} {exercises}</p>

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
    </>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((totalExercises, currentPart) => {
    return totalExercises + currentPart.exercises
  }, 0)

  return <strong>total of {total} exercises</strong>
}

const Course = ({ course }) => {
  
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course