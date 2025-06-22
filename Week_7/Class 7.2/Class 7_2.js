// Context API

// You need to vist the class-7-2-app folder to see the code for this. It is present in Class 7.1 folder.

// After using Context API, you might intuitively expect that whoever is using useContext(CountContext) will re-render whenever count changes. And therefore you might think that the "Count" component does not need to re-render since it does not uses the state variable.
// However, the "Count" component does re-render.


// Interview Question : 

// Why do you use the context API ? To make rendering more performant?

// No. we use context api to make syntax cleaner and to get rid of prop drilling.


// State Management Libraries lets you do both - make rendering more performant and get rid of prop drilling.


// State management - A cleaner way to store the state of your app 
// Until now, the cleanest thing you can do is use the Context API. It lets you teleport state 
// But there are better solutions that get rid of the problems that Context Api has (unnecessary re-renders)

// A Project can now be divided into two parts -
// 1. Components
// 2. State management




// Recoil - A state management library for React 
// Written by some ex React folks (I think) 
// Other popular ones -  
// 1. Zustand 
// 2. Redux

// Recoil has a concept of an atom to store the state 
// An atom can be defined outside the component  
// Can be teleported to any component

// Creating atoms
// atom is similar to useState. Both let you define a state variable.

// Atom is created in a separate file and then imported in the component where it is needed. There is no need to pass it down as a prop. No component other than the ones that need it will re-render when the state changes.

// Again migrate to class-7-2-app folder to see the code for this.

// you should be using recoil for global state management only. For local state management, you should use useState. That means if a state variable is only needed in a single component, you should use useState. If a state variable is needed in multiple components, you should use recoil.

// npm install recoil

// Things to learn -

// useRecoilState - is exactly the same as useState. It returns an array with two elements. The first element is the state variable and the second element is a function to update the state variable.

// useRecoilValue -  Read State Only (Prevents Unnecessary Renders)
// 🔹 It only reads the state (no setter function).
// 🔹 Prevents unnecessary re-renders when updates happen elsewhere.

// useSetRecoilState - Update State Without Re-Rendering
// 🔹 Returns only the setter function.
// 🔹 Component doesn’t re-render when state updates (improves performance).

// Note - 
// ✅ A component re-renders when:
// It reads a Recoil value (useRecoilValue(atom) or useRecoilState(atom)).

// ❌ A component does NOT re-render when:
// It writes to Recoil (useSetRecoilState) but doesn't read — this does not trigger a re-render for the writing component.


// <RecoilRoot> - Anything that uses Recoil logic should be wrapped in RecoilRoot. 


// selector - It is used when something is completely dependent on a state variable. It is similar to useMemo.
// A selector represents a piece of derived state. You can think of derived state as the output of passing state to a pure function that derives a new value from the said state.


// You would use selectors rather than useMemo because what if you want to repeat the same logic in multiple components? You would have to write the same logic (useMemo) in multiple components. Instead, you can use a selector and use it in multiple components.
// So useMemo remains restricted to a single component while selectors can be used in multiple components.





// For assignment 

// export const filteredTodos = selector({
//     key: "filteredTodos",
//     get: (({get}) => {
//         const todos = get(todosAtom);
//         const filter = get(filterAtom);

//         return todos.filter(x => x.title.includes(filter) || x.description.includes(filter));
//     })
// })


























// NOTE - RECOIL DOESN'T WORK NOW WITH REACT 19.0.0. 
// While it is not optimal to learn recoil these days, since it is not being maintained (jotai is being preferred now for atomic state management) , if you want to move forward with recoil itself then you shoul first uninstall the current versions of react and react-dom and then again install them at their version 18.0.0




// If you want you can use jotai instead of recoil. It is a newer library and is being preferred now for atomic state management.

// npm install jotai

// useAtom - It is similar to useRecoilState. It returns an array with two elements. The first element is the state variable and the second element is a function to update the state variable.
// useAtomValue - It is similar to useRecoilValue. It only reads the state (no setter function).
// useSetAtom - It is similar to useSetRecoilState. It returns only the setter function.
// <Provider> - Anything that uses Jotai logic should be wrapped in <Provider>.
