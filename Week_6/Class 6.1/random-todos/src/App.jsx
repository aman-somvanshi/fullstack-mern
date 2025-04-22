import { useEffect, useState } from "react";


function App() {

  const [todos, setTodos] = useState([]);


  async function fetchTodos(){
    const response = await fetch("http://localhost:3000/todos");
    const newTodos = await response.json();
    setTodos(newTodos);
    console.log(todos);
  }

  // A helpful library - useAsyncEffect
  useEffect( () => {
    setInterval(() =>{
      fetchTodos();
    }, 10000)
  }, []) // Empty array means it runs only once, that is, when it is mounted
    
  
  
  return <>
    {todos.map(function(todo) {
      return <Todo title={todo.title} description={todo.description} />
    })}
  </>

}

function Todo({title, description}){
  return <div>
        <h1>{title}</h1>
        <h2>{description}</h2>
      </div>
}


export default App
