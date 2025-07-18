// Most people use functional components nowadays and not class components.

// LifeCycle Events

// These are events that can get triggered or some code that you can run whenever a lifecycle of a component changes

// e.g., componentDidMount() , componentWillUnmount().

// refer to App.jsx of hooks-practice.

// We can return a function from a useEffect. Don't return any other value. This will run whenever the dependency chnages.

// Refer to App.jsx again.

// So the first time dependency changes. Console will only show "component mounted" as output.
// But when the dependency changes for the second time, first the cleanup code will run , and then the normal code will run. So in that case, output would be -
// component unmounted
// component mounted

// Similarly, this goes in the same manner so on and so forth
// And so, when the component unmounts for the final time. Only the cleanup logic would run. Output -
// component unmounted

// Problem Statement - Unmount the component from the DOM after 10 seconds.












// Custom Hooks  --> Refer to part 2 of App.jsx

// Hooks that you create yourself, so other people can use them are called custom hooks.

// A custom hook is effectively a function, but with the following properties - 
// 1. Uses another hook internally (useState, useEffect, another custom hook)
// 2. Starts with use

// A few good examples of this can be 
// 1. Data fetching hooks
// 2. Browser functionality related hooks - useOnlineStatus , useWindowSize, useMousePosition
// 3. Performance/Timer based - useInterval, useDebounce




// I. Data Fetching Hooks

// Data fetching hooks can be used to encapsulate all the logic to fetch the data from your backend into a single variable and returns that variable.

// In App.jsx, useGames() is a data fetching hook.


// 2. Cleaning the hook to include a loading parameter.
// We can also make use of skeletons in this case.



// 3. Auto refreshing hook
// What if you want to keep polling the backend every n seconds? n needs to be passed in as an input to the hook
// This cleanup logic was added to stop the old clock. Because, when the value of n is changed, a new interval is created with a new clock. So we must remove the old clock first.
// Also, this logic would run only when value of n is changed.


// SWR - React Hooks for Data Fetching
// swr is a popular React library that creates a lot of these hooks for you, and you can use it directly.


// 🟡 When to use useSWR?
// Client-side data fetching (REST, GraphQL, etc.)
// You want auto-refresh or caching without extra code


// 🧠 How it works:
// useSWR() triggers fetcher(url)
// Shows cached data (if any) immediately
// Then fetches fresh data and updates UI
// Automatically re-fetches when:
// 1. The window/tab is refocused
// 2. The user goes back online





// PART - 4



// II. Browser functionality related hooks

// 1. useIsOnline hook
// create a hook that returns true or false based on whether the user is currently online or not

// window.navigator.onLine returns true or false based on whether the user is online or not (whether the wifi is on or not)

// You can attach the following event listeners to listen to weather the user is online or not
// window.addEventListener('online', () => console.log('Became online'));
// window.addEventListener('offline', () => console.log('Became offline'));

// paste this into browser console and hit enter.

// Now if I turn off the wifi, it will automatically print "Became offline". And when I turn the wifi back on, it will print "Became online".

//  Go check out App.jsx PART-4




// 2. useMousePointer hook
// Create a hook that returns you the current mouse pointer position.
// The final react app that uses it looks like this - https://youtu.be/Jp6fLijh2Kk

// You are given that 
// window.addEventListener('mousemove', handleMouseMove);
// will trigger the handleMouseMove function anytime the mouse pointer is moved.

// whenever the mouse moves within the document, the clientX and clientY properties of the event object are accessed to get the current mouse coordinates relative to the viewport






// 3. useDimensions -> to get the current width and height of the browser window

// window.addEventListener('resize', handleResize);
// will trigger the handleResize function anytime the size of browser window is changed.

// window.innerWidth
// window.innerHeight












// III. Performance / Timer based hooks

// 1. useInterval

// Create a hook that runs a certain callback function every n seconds.
// You have to implement useInterval which is being used in the code.


// 2. useDebounce

// Create a hook that debounces a value given
// 1. The value that needs to be debounced
// 2. The interval at which the value should be debounced.




// Debouncing -

// Debouncing is a technique used to limit how often a function is called. It ensures that a function executes only after a specified delay has passed without it being called again.

// Imagine typing into a search bar that fetches suggestions. Without debouncing, the API would be called on every keystroke. With debouncing, the API is called only after the user stops typing for, say, 500ms.

// 🧠 Key Idea

// "Wait a little before doing the action. If the action is triggered again, reset the timer."


// ✅ Common Use Cases
// Search input (onChange)
// Scroll events
// Button spamming prevention



// 📌 When to Use Custom Hooks
// Use them when:

// 1. ou’re repeating the same hook logic across multiple components
// (e.g., managing forms, timers, fetching APIs, etc.)

// 2. You want to isolate side effects (e.g., localStorage sync, event listeners)

// 3. You’re abstracting complex state logic into a reusable block


// How is deferring a value different from debouncing and throttling? 

// Ans - https://react.dev/reference/react/useDeferredValue#how-is-deferring-a-value-different-from-debouncing-and-throttling

// There are two common optimization techniques you might have used before in this scenario:

// Debouncing means you’d wait for the user to stop typing (e.g. for a second) before updating the list.
// Throttling means you’d update the list every once in a while (e.g. at most once a second).
// While these techniques are helpful in some cases, useDeferredValue is better suited to optimizing rendering because it is deeply integrated with React itself and adapts to the user’s device.

// Unlike debouncing or throttling, it doesn’t require choosing any fixed delay. If the user’s device is fast (e.g. powerful laptop), the deferred re-render would happen almost immediately and wouldn’t be noticeable. If the user’s device is slow, the list would “lag behind” the input proportionally to how slow the device is.