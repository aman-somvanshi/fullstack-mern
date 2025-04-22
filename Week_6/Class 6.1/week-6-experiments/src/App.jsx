import React, { memo, useState } from 'react'
// Or instead of the above line you could have used object destructuring and used the below line , then you can use <Fragment></Fragment> instead of <React.Fragment>
// import { Fragment } from 'react'
import './App.css'

function App() {

  const [title, setTitle] = useState("Aman Somvanshi");

  function updateTitle(){
    setTitle(Math.random());
  }

  return (
    // <div>
    // <React.Fragment>
    // <>
    <div>
      <button onClick={updateTitle}>Click me to change the title</button>
      <Header title={title}></Header>
      <Header title={title}></Header>
      {/* <HeaderWithButton></HeaderWithButton> */}
      <Header title="The Rebel Incarnate 1"></Header> {/* This is a component whose props remain unchanged. Hence you can use memo to prevent its re-rendering. Below headers are also the same type.*/}
      <Header title="The Rebel Incarnate 2"></Header>
      <Header title="The Rebel Incarnate 3"></Header>
      <Header title="The Rebel Incarnate 4"></Header>
      <Header title="The Rebel Incarnate 5"></Header>
      </div>
    // </>  
    // </React.Fragment>
    // </div>
  )
}

// Both <> and <Fragment> don't introduce an extra DOM element. So they are better than using div.

// function Header(props){
//   return <div>
//     This is a Header with the title - {props.title}
//   </div>
// }

// You can use the above way or you can use object destructuring as shown below -
// function Header({title}){
//   return <div>
//     This is a Header with the title - {title}
//   </div>
// }

const Header = memo(function Header({title}){
  return <div>
    This is a Header with the title - {title}
  </div>
})

function HeaderWithButton(){
  const [firstTitle, setFirstTitle] = useState("Aman Somvanshi");

  function updateFirstTitle(){
    setFirstTitle(Math.random());
  }

  return <>
    <button onClick={updateFirstTitle}>Update the first title</button>
    <Header title={firstTitle}></Header>
  </>
}

// You want to minimise the number of re-renders to make a highly optimal react app 
// The more the components that are getting re-rendered, the worse

// SOLUTION
// Push the state down. Notice how in App.jsx , state variables have been pushed down from App component to the HeaderWithButton component. 



export default App
