// Reconciliation

// It is the process of taking the new state, finding the diff between the new state and the existing state, reconciling what the DOM should look like right now, and then putting things onto the DOM.

// Can you do DOM manipulation yourself - Yes 
// Should you do it yourself - No 
// Is it good for you to delegate the heavy task of calculating the DOM changes to React - Yes 
// What do you give to React - The state 
// How often does react re-render - Any time state changes 
// Does React have tricks to make calculations faster - Yes 


// View the another-counter-app folder now. Note without strict mode, the component re-renders won't be visible in react dev tools.


// useEffect  --> See the second part of App.jsx

// SideEffects --> Things that are not done on every render. A side effect is anything a component does outside of rendering the UI. This includes:
// Fetching data from an API
// Updating the DOM manually
// Setting up timers or intervals
// Storing data in localStorage


// useEffect expects 2 inputs
// 1. What logic to run
// 2. On what state variable change should it run

// Both useEffect and useMemo lets you skip executing some logic between re-renders based on the dependency array.

// The difference between useEffect and useMemo is that useEffect does not return anything, while useMemo returns a value.

// The difference between useMemo and memo is that useMemo allow you to execute a code snippet when certain dependencies change, while memo allows you to skip re-rendering a component when its props don't change.


// useCallback 
// If you ever want to memoize a function, we use useCallback

// useCallback ensures that the functions which will be passed down to child components are not recreated on every render and hence remain unchanged. So if you've put the child component inside a memo, it won't re-render.
// If you hadn't used useCallback and used memo, still the Child component would have re-rendered because the function would have been recreated on every render.
// If you had used useCallback but not memo, the child component would have re-rendered because the parent component would have re-rendered.

// useMemo stores a value whereas useCallback can store a function







// useRef -->  It is mainly used for:

// 1. Accessing DOM elements (like input fields).   (discussed in App.jsx)
// 2. Storing values between renders without triggering re-renders.  (Not discussed)

// useRef is used when you want to have access to a variable across renders which is not a state variable.

// You can use useRef to store a variable that is neither a global variable nor a state variable but is required to persist across renders.