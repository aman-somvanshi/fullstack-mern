// import { useState, Component } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { useEffect } from 'react'

// function App() {
//   const [render, setRender] = useState(true);

//   useEffect(() => {
//     // setTimeout(() => {
//     //   setRender(false);
//     // }, 10000)
//     setInterval(() => {
//       setRender(r => !r); // switching of Render variable to the opposite of existing value every 5 seconds
//     }, 5000)

//     // This setInterval will keep the MyComponent mounting and unmounting every 5 seconds as will be visible in the console logs.
//   }, []);

//   return (
//     <>
//       {render? <MyComponent/> : <div></div>}
      
//     </>
//   )
// }

// // function MyComponent() {
// //   const [count, setCount] = useState(0);

// //   const incrementCount = () => {
// //     setCount(count + 1);
// //   };

// //   return (
// //     <div>
// //       <p>{count}</p>
// //       <button onClick={incrementCount}>Increment</button>
// //     </div>
// //   );
// // }


// // class MyComponent extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = { count: 0 };
// //   }

// //   incrementCount = () => {
// //     this.setState({ count: this.state.count + 1 });
// //   }

// //   render() {
// //     return (
// //       <div>
// //         <p>{this.state.count}</p>
// //         <button onClick={this.incrementCount}>Increment</button>
// //       </div>
// //     );
// //   }
// // }

// function MyComponent() {
//   useEffect(() => {
//     // Perform setup or data fetching here
//     console.log("component mounted")

//     return () => {
//       // Cleanup code (similar to componentWillUnmount)

//       console.log("component unmounted");
//       // This will run whenever the dependency chnages.
//     }
//   }, [])

//   // So the first time dependency changes. Console will only show "component mounted" as output.
//   // But when the dependency changes for the second time, first the cleanup code will run , and then the normal code will run. So in that case, output would be -
//   // component unmounted
//   // component mounted

//   // Similarly, this goes in the same manner so on and so forth
//   // And so, when the component unmounts for the final time. Only the cleanup logic would run. Output -
//   // component unmounted

//   // Render UI

//   return <div>
//     From inside my component
//   </div>
// }


// class MyComponent extends React.Component {
//   componentDidMount() {
//     // Perform setup or data fetching here
//     console.log("component mounted");
//   }

//   componentWillUnmount() {
//     // Clean up (e.g., remove event listeners or cancel subscriptions)
//     console.log("component unmounted");

//   }

//   render() {
//     // Render UI
//     return <div>Hi there</div>
//   }
// }

// export default App

















// PART - 2 --> Custom Hooks
// import { useEffect, useState } from 'react'
// import axios from 'axios'


// // Here games is a data fetching custom hook.
// function useGames(n) {
//   const [games, setGames] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect( () => {

//     async function fetchGames(){
//       await axios.get("https://api.sampleapis.com/playstation/games")
//       .then(res => {
//         setGames(res.data);
//         setLoading(false)
//       })
//     }

//     const intervalId = setInterval(fetchGames, n*1000);
//     fetchGames(); // We did this because in the case of setInterval, the first response will be seen only after 3 seconds. So, user won't see anything for 3 seconds. Hence, we send out a request.

//     return () => {
//       clearInterval(intervalId);
//     } // This cleanup logic was added to stop the old clock. Because, when the value of n is changed, a new interval is created with a new clock. So we must remove the old clock first.
//     // Also, this logic would run only when value of n is changed.
    
//   }, [n])

//   return {games, loading};
// }

// function App() {

//   const {games, loading} = useGames(3);
  

//   return (
//     <>
//         <div>
//           {loading? "Loading..." : games.map(game => <Track key={game.id} game={game} />)}
//         </div>
//     </>
//   )
// }

// function Track({ game }) {
//   return <div>
//     Game Name - {game.name}
//     <br />
//     {game.developers[0]}
//   </div>
// }

// export default App



















// PART -3
// SWR
// import useSWR from 'swr';
// import axios from 'axios';

// const fetcher = async function(url) {
//   const response = await axios.get(url);
//   const finalData = response.data;
//   return finalData;
// }

// export default function App() {
//   return (
//     <Profile />
//   )
// }

// function Profile() {
//   const { data, error, isLoading } = useSWR('https://api.sampleapis.com/playstation/games', fetcher)
 
//   if (error) return <div>failed to load</div>
//   if (isLoading) return <div>loading...</div>
//   return <div>hello, you have {data.length} games!</div>
// }






















// PART - 4
// Browser functionality related hooks

// 1. useIsOnline hook
// import { useEffect, useState } from "react";

// export default function App() {
//   const isOnline = useIsOnline();

//   if(isOnline)
//     return "Yay ! you are online"

//   return "You are offline, please connect to the Internet"
// }

// function useIsOnline() {
//   const [isOnline, setIsOnline] = useState(window.navigator.onLine);

//   useEffect( () => {
//     window.addEventListener('online', () => setIsOnline(true));
//     window.addEventListener('offline', () => setIsOnline(false));

//     return () => {
//       window.removeEventListener("online", () => setIsOnline(true));
//       window.removeEventListener('offline', () => setIsOnline(false));
//     }
//   }, []);

//   return isOnline;
// }










// 2. useMousePointer hook



// import { useEffect, useState } from "react";

// export default function App() {
//   const mousePointer = useMousePointer();

//   return (
//     <div>
//       Your mouse position is {mousePointer.x} , {mousePointer.y}
//     </div>
//   )
// }

// function useMousePointer() {
//   const [position, setPosition] = useState({x:0 , y:0});

//   const handleMouseMove = (e) => {
//     setPosition({x:  e.clientX, y: e.clientY});
//   }

//   useEffect( () => {
//     window.addEventListener('mousemove', handleMouseMove);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//     }
//   }, []);

//   return position;
// }












// 3. useDimensions 


// import { useEffect, useState } from "react";

// export default function App() {

//   const {height, width} = useDimensions();

//   return (
//     <div>
//       <div>The current height of the browser window is {height}</div>
//       <div>The current width of the browser window is {width}</div>
//     </div>
//   )

// }

// function useDimensions(){

//   const [size, setSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight
//   })

//   const handleResize = () => {
//     setSize({
//       width: window.innerWidth,
//       height: window.innerHeight
//     })
//   }

//   useEffect( () => {
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     }
//   }, []);

//   return size;
// }






// 4. useInterval hook
// import { useEffect } from "react";
// import { useState } from "react";

// export default function App() {

//   const[count, setCount] = useState(0);

//   useInterval(() => {
//     setCount(c => c+1);
//   }, 1000)


//   return (
//     <>
//       Timer is at {count}
//     </>
//   )
// }

// function useInterval(callbackFn, timeout){
//   useEffect(() => {
//     const intervalId = setInterval(callbackFn, timeout);


//     return () => {
//       clearInterval(intervalId);
//     }
//   }, []);
// }








// 5. useDebounce hook

import { useEffect } from "react";
import { useState } from "react"
const App = () => {
  
  return (
    <>
      <SearchBar />
    </>
  )
  
}

const SearchBar = () => {
  const [inputValue, setInputValue] = useState(0);
  const debouncedValue = useDebounce(inputValue, 500);// 500 milliseconds debounce delay

  // Use the debouncedValue in your component logic, e.g., trigger a search API call via a useEffect

  // useEffect(() => {
  //   axios.get("https://api.sampleapis.com/playstation/games")
  // }, [debouncedValue])
  return (
    <>
    Debounced Value is {debouncedValue}
    <input
    type="text"
    placeholder="Search..."
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    />
    
    </>
    
  )
}

function useDebounce(inputValue, delay) {

  const [debouncedText, setDebouncedText] = useState("");

  useEffect(() => {
    
    const timerId = setTimeout(() => {
      setDebouncedText(inputValue);
    }, delay);

    return () => {
      clearTimeout(timerId);
    }
  }, [inputValue, delay]);

  return debouncedText;
}
export default App;









