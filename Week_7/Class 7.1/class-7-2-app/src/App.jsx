// import { useState, useContext } from "react"
// import { CountContext } from "./context";


// function App() {
  
//   const [count, setCount] = useState(0);

//   // Notice how setCount is being passed down to the Count component as a prop even though it doesn't use it directly. It just passes this prop down to its child component (the Buttons component).
//   // This is an example of prop drilling.


//   // wrap anyone that wants to use the teleported value inside a provider.

//   return (
//     <>
//      <div>
//         <CountContext.Provider value={count}>
//           <Count setCount={setCount}/>
//         </CountContext.Provider>
//       </div> 
//     </>
//   ) // We want the state variable count to be teleported to the CountRenderer component and the Buttons component without it ever being passed down to Count component (basically avoid prop drilling).
// }

// function Count({ setCount}) {
//   console.log("Count re-rendered"); // yeah, it does re-render even though it isn't using a state variable
  
//   return <div>
//     <CountRenderer />
//     <Buttons setCount={setCount}/>
//   </div>
// }

// function CountRenderer(){

//   const count = useContext(CountContext);
//   return <div>
//     {count}
//   </div>
// }

// function Buttons({ setCount}) {
//   const count = useContext(CountContext);
//   return <div>
//     <button onClick={() => {
//       setCount((currentCount) => currentCount + 1);
//     }}>Increase</button>
//     <button onClick={() => {
//       setCount((currentCount) => currentCount - 1);
//     }}>Decrease</button>
//   </div>
// }

// // After using Context API, you might intuitively expect that whoever is using useContext(CountContext) will re-render whenever count changes. And therefore you might think that the "Count" component does not need to re-render.

// export default App







// -----------------------------------------------------------------------
// WITH RECOIL













import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { countAtom, evenSelector } from "./store/atoms/count";
import { useMemo } from "react";


function App() {


  return (
    <>
     <div>
        <RecoilRoot>
          <Count/>
        </RecoilRoot>
      </div> 
    </>
  ) 
}

function Count() {
  console.log("Count re-rendered"); // Now these logs don't arise on increasing or decreasing the counter. This happened because we are using recoil
  
  return <div>
    <CountRenderer />
    <Buttons />
    <EvenCountRenderer /> 
  </div>
}

function CountRenderer(){

  const count = useRecoilValue(countAtom);
  return <div>
    {count}
  </div>
}

function Buttons() {
  console.log("Button re-rendering");
  
  // const [count, setCount] = useRecoilState(countAtom);

  // Since button is re-rendering , we can avoid that by using the functional form of setCount

  const setCount = useSetRecoilState(countAtom);

  // Now the buttons won't re-render
  return <div>
    <button onClick={() => {
      // setCount(count+1);
      setCount(currCount => currCount+1)
    }}>Increase</button>
    <button onClick={() => {
      // setCount(count-1);
      setCount(currCount => currCount-1)
    }}>Decrease</button>
  </div>
}

function EvenCountRenderer(){

  // const count = useRecoilValue(countAtom);
  
  // const isEven = useMemo(() => {
  //   return (count % 2 == 0);
  // }, [count])

  const isEven = useRecoilValue(evenSelector);
  return <div>
    {isEven ? "It is even " : null}
  </div>
}

export default App
