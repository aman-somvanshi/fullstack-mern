
import { useState } from 'react'
import './App.css'

let counter = 4;

function App() {
  
  const [todos, setTodos] = useState([{
    id: 1,
    title: "Go to Gym",
    description: "Go to gym from 3-5"
  },
  {
    id: 2,
    title: "Go to Dance",
    description: "Go to Dance from 3-5"
  },
  {
    id: 3,
    title: "Go to La La Land",
    description: "Go to gym from 3-5"
  }])

  function addTodo(){

    // First way 
    setTodos([...todos, {
      id: counter++,
      title: Math.random(),
      description: Math.random()
    }])
  
    // Second way
    
    // const newTodos = [];
    // for(let i=0;i<todos.length;i++){
    //   newTodos.push(todos[i]);
    // }
    // newTodos.push({
    //   id: 4,
    //   title: Math.random(),
    //   description: Math.random()
    // })
    // setTodos(newTodos);
  }

  function CreateTodo(){
    
    return <>
        <input type='text' placeholder='Enter Todo Title'></input>
      <br></br><br></br>
      <input type='text' placeholder='Enter Todo Description'></input>
      <br></br><br></br>
      <button onClick={addTodo}>Add a Todo</button>
    </>
  }


  return (
    <>
      <CreateTodo></CreateTodo>
      {todos.map(function (todo){
        return <Todo key={todo.id}  title={todo.title} description={todo.description}></Todo>
      })}

    </>
  )

  // In JSX, curly braces {} are used to embed JavaScript expressions within the markup. That's why, map function is implemented in braces.
}

function Todo({title, description}) {

  return <div>
          <h2>{title}</h2>
          <h3>{description}</h3>
      </div>
}




export default App
