// This file was initially the counter-app application. Later on, it was used as Todo Application 

import './App.css'
import { useState } from 'react';

//useState is a hook

// let state = {
//   count : 0
// }
// The above way of declaring state doesn't work in react.



function App() {
  // const [count, setCount] = useState(0);
  // // console.log(count);
  // // console.log(setCount);

  // // function onClickHandler() {
  // //   // state.count = state.count + 1;
  // //   // console.log(state.count);
  // //   // This is not re-rendering the component even though the count is changing because react does not consider every variable as a state variable. It isn't watching this variable
  // //   // To make sure react watches a certain variable, you need to follow a specific syntax

  // //   setCount(count+1);
  // // }


  // return (
  //   <div>
  //     {/* <button onClick={onClickHandler} >Counter {state.count}</button> */}
  //     {/* <button onClick={onClickHandler} >Counter {count}</button> */}
  //     <CustomButton count={count} setCount={setCount}></CustomButton>
  //   </ div>
  // )

  const [todos, setTodos] = useState([{
    title: "Go to Gym",
    description: "Go to gym from 7-9",
    completed: false
  },
  {
    title: "Study DSA",
    description: "Study DSA from 9-11",
    completed: true
  },
  {
    title: "Study Dev",
    description: "Study DSA from 11-1",
    completed: true
  },

]);


// [1,2]
// [...todos, 3] ===> [1,2,3]
function addTodo() {
  setTodos([...todos, {
    title: "New Todo",
    description: "Description of new todo"
  }])
}

  return (
    <div>
      {/* {JSON.stringify(todos)} */}
      {/* <Todos title ="Aman" description="Somvanshi"></Todos> */}


      {/* To iterate over all the todos present inside the state we have used map function here */}
      {todos.map(function(todo) {
        return <Todo title={todo.title} description={todo.description}></Todo>
      })}

      <button style={{backgroundColor:"violet",
        color:"white",
      }} onClick={addTodo}>Add a new todo</button>
    </div>
  )
}



// State variables are passed into components as props

// CustomButton is a component
// function CustomButton(props) {

//   function OnClickHandler(){
//     props.setCount(props.count+1);
//   }

//   return (
//     <button onClick={OnClickHandler}>
//       Counter {props.count}
//     </button>
//   )
// }


function Todo(props) {
  return <div>
    <h1>{props.title}</h1>
    <h2>{props.description}</h2>

  </div>
}

export default App

// NOTE - Any time a parent is re-rendered, its children are re-rendered as well even if they are not taking any state variable as input.