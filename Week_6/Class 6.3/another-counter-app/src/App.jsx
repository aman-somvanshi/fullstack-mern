
// PART 1 --> Reconciliation


// import { useState } from "react"


// function App() { // This function running means the component has re-rendered

//   const [count, setCount] = useState(0); // State
//   console.log("Hi there from App.jsx"); // this log will signify the runnning of this App function

//   return (
//     <>
//       <button onClick={function () {
//         setCount(count+1); // State update
//       }}>Count is {count}</button>
//     </>
//   )
// }

// export default App



// PART 2 --> useEffect



// import { useEffect, useState } from 'react'

// function App() {
//   const [exchangeData, setExchangeData] = useState({});
//   const [bankData, setBankData] = useState({});
//   console.log("Hi there from App.jsx")

//   // setTimeout(() => {
//   //   setBankData({income : 100});
//   // }, 3000)
  
//   // setTimeout(() => {
//   //   setExchangeData({
//   //     returns: 100
//   //   });
//   // }, 1000);

//   useEffect(() => {
//     setTimeout(() => {
//       setBankData({income : 100});
//     }, 3000)
//   }, [])
  
//   useEffect(() => {
//     setTimeout(() => {
//       setExchangeData({
//         returns: 100
//       });
//     }, 1000);
//   }, [])

//   // Now 3 re-renders happen - first then when the App component is mounted. the 2nd time when bankData is changed and the 3rd time when ExchangeData is changed.
  

//   const incomeTax = (bankData.income + exchangeData.returns) * 0.3;

//   return (
//     <div>
//         hi there, your income tax returns are {incomeTax}
//     </div>
//   ) // This keeps on re-rendering like an infinite loop


//   // The problem -  
// // When you get either one of the data, the component re-renders, which causes both the things to trigger again

// // The Solution - 
// // useEffect hook

// }

// export default App









// PART 3 --> useMemo & useCallback

// import { useEffect, useMemo, useState, memo, useCallback } from 'react'

// function App() {
//   const [exchange1Data, setExchange1Data] = useState({});
//   const [exchange2Data, setExchange2Data] = useState({});
//   const [bankData, setBankData] = useState({});

//   useEffect(() => {
//     // Some operation to get the data
//     setExchange1Data({
//       returns: 100
//     });
//   }, [])

//   useEffect(() => {
//     // Some operation to get the data
//     setExchange2Data({
//       returns: 100
//     });
//   }, [])

//   useEffect(() => {
//     // Some operation to get the data
//     setTimeout(() => {
//       setBankData({
//         income: 100
//       });
//     }, 5000)
//   }, [])


//   // useMemo


//   // // console.log("Hi there before");
//   // const cryptoReturns = useMemo(() => {
//   //   console.log("Hi there before");
//   //   return exchange1Data.returns + exchange2Data.returns;
//   // }, [exchange1Data, exchange2Data])
//   // // console.log("Hi there after");

//   // const incomeTax = (cryptoReturns + bankData.income) * 0.3

//   // Should you recompute cryptoReturns if only bankData has changed in a render?
//   // No

//   // return (
//   //   <div>
//   //       hi there, your income tax returns are {incomeTax}
//   //   </div>
//   // )


//   // useCallback --> It is not about the minimizing the amount of code that is run. It is about not rendering a child component, if the function hasn't / doesn't need to change across renders

//   const calculateCryptoReturns = useCallback(function() {
//       return exchange1Data.returns + exchange2Data.returns; // Mkae sure whatever you have used inside the function is in the dependency array
//   }, [exchange1Data, exchange2Data]) // so now if bankData changes, the child component won't re-render



//   return (
//     <div>
//         <CryptoGainsCalculator calculateCryptoReturns={calculateCryptoReturns}></CryptoGainsCalculator>
//     </div>
//   )
// }

// const CryptoGainsCalculator = memo(function({calculateCryptoReturns}) {
//   console.log("Crypto child re-rendered");
//   return <div>
//     Your crypto returns are {calculateCryptoReturns()}
//   </div>
// }) // Even after memoizing, this component re-renders every time the parent component re-renders. This is because the function calculateCryptoReturns is re-created every time the parent component re-renders. This is where useCallback comes in.

// export default App









// PART 4 --> useRef

import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const divRef = useRef(); // This is a reference to the div element

  useEffect(() => {
    setTimeout(() => {
      console.log(divRef.current); // Output - <div>10</div>
      divRef.current.innerHTML = "10"
    }, 3000);
  }, [])

  const incomeTax = 20000;

  return (
    <div>
        hi there, your income tax returns are <div ref={divRef}>{incomeTax}</div>
    </div>
  )
}

export default App