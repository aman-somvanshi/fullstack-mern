// import { useEffect, useState } from "react"
// import axios from "axios";

// function App() {

//   const [todos, setTodos] = useState([]);
//   const [todoId, setTodoId] = useState(1);

//   // async function fetchTodos(){
//   //   // const response = await fetch("http://localhost:3000/todos");
//   //   // const json = await response.json();
//   //   // setTodos(json.allTodos); // The server from class 5.2 todo-app is used here. It returns the array inside allTodos propery
    

//   //   // Let's use axios this time 
//   //   const response = await axios.get("http://localhost:3000/todos");
//   //   // console.log(response.data.allTodos);
//   //   setTodos(response.data.allTodos);// The server from class 5.2 todo-app is used here. It returns the array inside allTodos propery
//   // }

  
//   // fetchTodos(); // This would cause an infinite amount of get requests since it runs at every re-render.
//   // Therefore, we use useEffect to ensure that it runs only on mounting that is on the inital render.
//   // useEffect(() => {
//   //   fetchTodos();
//   // } , []) // But get request is actually sent twice because of React.StrictMode

//   async function fetchTodosById(id){
//     const response = await axios.get("http://localhost:3000/todos?id=" + id);
//     console.log(response.data);
//     setTodos([response.data]);
//   }

//   useEffect(() => {
//     fetchTodosById(todoId); // instead of using useEffect for async functions using async-await like this, it is recommmended that you use use-async-effect library
//   }, [todoId])

//   function handleNextTodo(){
//     setTodoId((prevId) => prevId + 1);
//   }

//   return (
//     <>
//       <button onClick={function (){
//         setTodoId(1)
//       }}>1</button>

//       <button onClick={function (){
//         setTodoId(2)
//       }}>2</button>

//       <button onClick={function (){
//         setTodoId(3)
//       }}>3</button>

//       <button onClick={function (){
//         setTodoId(4)
//       }}>4</button><br></br>
//       {todos.map((todo) => {
//         return <Todo id={todo.id} title={todo.title} description={todo.description}></Todo>
//       })}
//       <button onClick={handleNextTodo}>View Next Todo</button> 
//     </>
//   )
// }

// function Todo({id, title, description}) {
//   console.log(id);
//   return <>
//     <div>
//       <p>Id : {id}</p>
      
//       <h2>{title}</h2>
//     </div>
//     <div>
//       <h4>{description}</h4>
//     </div>
    
    
//   </>
// }

// export default App





// For understanding CustomHooks -

import axios from "axios";
import { useEffect, useState } from "react";

function useTodos() {
  const [todos, setTodos] = useState([]);

  async function fetchTodos(){
    const response = await axios.get("http://localhost:3000/todos");
    setTodos(response.data.allTodos);
  }

  useEffect(() => {
    fetchTodos();
  }, [])

  return todos;
}
function App(){

  const allTodos = useTodos();

  return (
    <>
      {allTodos.map(function (todo) {
        return <Todo title={todo.title} description={todo.description}></Todo>
      })}
    </>
  )
}

function Todo({title, description}) {
  return <>
    <h2>
      {title}
    </h2>
    <h4>
      {description}
    </h4>
  </>
}

export default App;
