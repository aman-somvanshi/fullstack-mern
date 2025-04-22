// Common hooks in react

// SIDE EFFECTS
// side effects are actions that happen outside of React’s normal rendering process. They do things like:
// ✅ Fetching data from an API
// ✅ Updating the webpage title
// ✅ Setting up event listeners (like click or scroll)
// ✅ Using setTimeout or setInterval

// React’s main job is to render UI based on state and props. But sometimes, we need to interact with the outside world, like making network requests or changing the page title.
// 👉 These actions don’t belong inside the UI logic and are called side effects.

//  The useEffect hook allows you to incorporate side effects into your components in a clean and organized manner.

// HOOKS
// React Hooks are functions that allow functional components in React to have state and lifecycle features that were previously available only in class components. 
// Some common hooks are  
// 1. useState 
// 2. useEffect 
// 3. useCallback 
// 4. useMemo 
// 5. useRef 
// 6. useContext



// 1. useState()

// `useState` is a React Hook that enables functional components to manage state. It returns an array with two elements: the current state value and a function to update that value.
// useState is the only hook you require to build a dynamic website (until you have to build a full-fledged application having fetch, setTimeout, etc)

// 2. useEffect()

// `useEffect` is a React Hook used for performing side effects in functional components. It is often used for tasks such as data fetching, subscriptions, or manually changing the DOM. The `useEffect` hook accepts two arguments: a function that contains the code to execute, and an optional array of dependencies that determines when the effect should run.

// Beautiful Analogy- 

// You are a car racer that has to do a 100 laps across a stadium .You are allowed to take a pit stop from time to time. 
// Do you take the stop in b/w every lap? Or do you take a stop after every 10 laps lets say?

// You will only make a pit stop From time to time  (Lets say once every 20 laps) 
// even though you pass right in front of it in every lap


// Making a pit stop is a side effect
// It is something that is not done on every render

// Dependency array takes state variables as input. And any time that state variable changes, the code within the useEffect re-runs.

// StrictMode commented out to ensure that get requests are only sent once that is upon the initial render and not twice.



// useMemo  --- discussed in counter-app folder
// Memoization - It means remembering some output given an input and not computing it again

// if you want to remember a value across renders, then use useMemo

// useEffect can be used instead of useMemo unless it is specified to use useMemo


// useCallback is a React Hook that returns a memoized version of a callback function. It is useful when you want to prevent a function from being recreated on every render, which can help optimize performance, especially when passing callbacks to child components that rely on reference equality to prevent unnecessary renders.

// ✅ useCallback(fn, [dependencies]) memoizes a function and prevents unnecessary re-renders. It memoizes (remembers) functions so that they don’t get re-created on every render. It helps optimize performance by preventing unnecessary re-renders of child components.


// useMemo is for memoizing values and useCallback is for memoizing functions.

// useMemo can memoize functions, but useCallback is specifically designed for memoizing functions, making it more readable and clear for that purpose.
// 🟢 Use useMemo for expensive calculations, and use useCallback for memoizing functions to prevent unnecessary re-renders in child components. 






// Custom Hooks  --- discussed in week-6-experiments folder
// Just like useState, useEffect, you can write your own hooks
// Only condition is - It should start with a "use" (naming convention)

// State variable can be defined only in a function that is either a React component or a hook.








// Note - 

// setCount(count + 1):
// Directly uses the current state value.
// Suitable for simple, synchronous updates.


// setCount((count) => count + 1):
// Uses the previous state value.
// Necessary for async/batched updates or when the new state depends on the previous state.


// function increaseCounter() {
//     setCount(count + 1); // First update
//     setCount(count + 1); // Second update
//   } // If count is 0, both calls will use the same value (0), so the final state will be 1 instead of 2.

// function increaseCounter() {
//     setCount((count) => count + 1); // First update
//     setCount((count) => count + 1); // Second update
//   } // Each call will use the updated value of count, so the final state will be 2.







// Interesting note -

// In js, == is used for comparison. For numbers and strings, it is equality by value.
// But for functions, and objects and arrays it is equality by reference.
// So react normally re-renders them across renders because the reference is different across renders.

// The == operator performs type coercion before comparison. This means it tries to convert the operands to the same type before comparing them.
// 5 == "5"; // true (string "5" is coerced to number 5)

// Always consider using === to avoid type coercion issues.