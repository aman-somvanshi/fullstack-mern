// React component return

// A component can only return a single top level xml. Why? 

// 1. Makes it easy to do reconciliation (Reconciliation is the process of figuring out what DOM updates need to happen as the application grows) 

// Chatgpt answer -
// In React, a component must return a single top-level element because JSX is syntactic sugar for React.createElement(), which expects a single root node. If multiple top-level elements were returned, React wouldn’t know how to structure them in the Virtual DOM. This is why components should wrap multiple elements inside a container like <div> or use Fragments (<>...</>) to avoid unnecessary wrappers.







// Re-rendering in React

// Any time react actually updates the DOM is what's considered as a re-render. 
// It could happen when you append/update/remove something to the DOM.

// Rule of the thumb in react is to minimize re-renders.

// A re-render means that  
// 1. React did some work to calculate what all should update in this component 
// 2. The component actually got called (you can put a log to confirm this) 
// 3. The inspector shows you a bounding box around the component

// It happens when 
// 1. A state variable that is being used inside a component changes 
// 2. A parent component re-render triggers all children re-rendering


// You want to minimise the number of re-renders to make a highly optimal react app 
// The more the components that are getting re-rendered, the worse

// SOLUTION
// Push the state down. Notice how in App.jsx , state variables have been pushed down from App component to the HeaderWithButton component. 

// State variables should be kept at the lowest common ancestor and never at the root.

// memo lets you skip re-rendering a component when its props are unchanged.
// You can use React.memo or memo directly by importing {memo} from react







// KEYS IN REACT

// Warning: Each child in a list should have a unique “key” prop.

// You need to give each array item a key — a string or a number that uniquely identifies it among other items in that array
// Keys tell React which array item each component corresponds to, so that it can match them up later. This becomes important if your array items can move (e.g. due to sorting), get inserted, or get deleted. A well-chosen key helps React infer what exactly has happened, and make the correct updates to the DOM tree.

// Rather than generating keys on the fly, you should include them in your data

// It just helps react to re-render easily and optimally







// WRAPPER COMPONENTS

// The component takes another componet as the input.
// Whenenver, you are defining a component, you can take {children} as the input which represents that if the component have passed something inside themselves, then they can be used as children.





// HOOKS
// Until now, we’ve discussed useState. These functions that start with "use" are called hooks 
// Hooks in React are functions that allow you to "hook into" React state and lifecycle features from function  components.
// Hooks in React are functions that let you use state and lifecycle features inside functional components without needing class components. 

// useEffect, 
// useMemo, 
// useCallback, 
// useRef,  
// useReducer 
// useContext 
// useLayoutEffect

// In React, "mounting" refers to the process of adding a component to the DOM (Document Object Model) for the first time. It is one of the key phases in a React component's lifecycle.

// Lifecycle events allow you to control what happens when a component is created, updated, or destroyed. Lifecycle events are primarily associated with class components, but with the introduction of React Hooks, functional components can also achieve similar functionality.

// The lifecycle of a React component can be divided into three main phases:

// 1. Mounting: The component is being created and inserted into the DOM.

// 2. Updating: The component is re-rendered due to changes in state or props.

// 3. Unmounting: The component is being removed from the DOM

// useEffect is a React Hook that lets you run code when a component renders or updates. It is mainly used for side effects like fetching data, manually updating the DOM, or setting up subscriptions.
// It can:
// ✅ Run when the component first appears (mounts)
// ✅ Run when certain values change (updates)
// ✅ Clean up before the component disappears (unmounts)


// In useEffect hook, there is a function and there is a dependency array (which basically tells when a function should run). 
// If the dependency array is empty then the function should run on the first mount.

// Remove React.strictmode from main.jsx . It will enable rendering only once and not twice.