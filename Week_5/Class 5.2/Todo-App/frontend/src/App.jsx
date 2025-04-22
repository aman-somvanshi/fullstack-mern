import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'
import { useState, useEffect } from 'react';

function App() {
  
  const [todos, setTodos] = useState([]);

  async function fetchTodos(){
    const response = await fetch ("http://localhost:3000/todos");
    const json = await response.json();
    console.log(json);
    setTodos(json.allTodos);
  }
  
  // fetchTodos()
  
  
  // Each time fetchTodos is called, setTodos is called and the state is updated. This will cause the App to re-render which will again call fetchTodos. This will cause an infinite loop. To avoid this, we can use useEffect hook.
  // So fixing that
  useEffect(() => {
    fetchTodos();
  }, [])

  // This ensures that the fetch call happens only once, that is at the very start when the App component mounts.


  return (
    <div>
      <CreateTodo />
      <Todos todos={todos}/>
    </div>
  )
}

export default App
