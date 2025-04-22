// import { useMemo } from "react";
// import { useState } from "react"

// function App() {

//   const [counter, setCounter] = useState(0);
//   const [inputValue, setInputValue] = useState(1);

//   // We could have used another state variable to store the sum but that isn't ideal as sum is completely dependent on the state variable inputValue and hence does not need to be stored in a state variable


//   function increaseCounter(){
//       setCounter(counter + 1)
//   }

//   // let sum=0;
//   // for(let i=1;i<=inputValue;i++){
//   //   sum = sum + i;
//   // } // this is an expensive operation which keeps running on every re-render even when the input value is not changed

//   let finalSum = useMemo(function () {
//     let sum=0;
//     for(let i=1;i<=inputValue;i++){
//       sum = sum + i;
//     }
//     return sum;
//   }, [inputValue]) // you can use useEffect here but remember :
// //   ✅ useMemo runs during rendering and directly returns a value.
// // ❌ useEffect runs after rendering, so it doesn’t immediately provide the computed value.

// // 🔴 Problem: The component renders first with old data, then updates after useEffect runs. This can cause extra re-renders.
// // ✅ Solution: useMemo directly provides the computed value during rendering, avoiding extra re-renders.


// You can use useMemo to return a function as well, however it ias suggested that you use useCallback in such case



//   return (    
//     <>
//       <input type="number" placeholder="Enter a number" onChange={function(e) {
//         setInputValue(e.target.value);
//       }}></input>
//       <br></br>
//       <div>Sum from 1 to {inputValue}  is : {finalSum} </div>
//       <br></br>
//       <button onClick={increaseCounter} >Counter ({counter})</button>
//     </>
//     // Currently , the app is re-rendered everytime a state variable changes. Suppose when only counter is changing, then too the sum is getting re-rendered.
//   )
// }

// export default App












// Let's try and understand useCallback now


import { memo, useCallback, useState } from "react";

function App(){
  const [count, setCount] = useState(0);


  // function inputFunction(){
  //   console.log("Hi there !")
  // }

  // So when re=renders happen , the button component is also re-rendered each time because across renders this inputFunction is different from previous function (even tho the body of both functions are the same). That means the prop is getting changed and hence re-render occurs.
  // The inputFunction seems different across each render because of referential equality. So we make use of useCallback.

  const inputFunction = useCallback(() => {
    console.log("Hi there !")
  } , []) // Now no re-renders of the button Component occur because react understands that the dependency array is empty and hence the function will not change across renders.
  // So essentially we memoized the function that is we remember it's original implementation and do not keep creating it in every re-render.

  return (
    <>
      <ButtonComponent inputFunction={inputFunction}></ButtonComponent><br></br>
      <button onClick={() => {
        setCount(count+1);
      }}> Click me {count}</button>
    </>
  )
}

const ButtonComponent = memo(({inputFunction}) => {

  console.log("Child render")
  return (
    <>
      <button onClick={inputFunction}>This is the button Component</button>
    </>
  )
})

export default App;


