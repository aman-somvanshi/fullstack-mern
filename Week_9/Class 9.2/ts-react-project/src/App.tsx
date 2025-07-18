import './App.css'

function App() {


  return (
    <>
      <Todo title='Go to Gym' description='At 10 pm' done={true} />
    </>
  )
}

interface TodoProp {
  title: string;
  description: string;
  done?: boolean;
}

function Todo(props: TodoProp) {
    return (
      <>
        <div>
          <h1>{props.title}</h1>
          <h2>{props.description}</h2>
          <h3>Done - {props.done? 'Yes' : 'No'}</h3>
        </div>
      </>
    )
}

export default App
