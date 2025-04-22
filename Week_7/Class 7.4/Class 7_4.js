// Atom - similar to useState hook
// An atom is the most smallest unit of state that you can store

//RecoilRoot - this component must wrap every component that uses a recoil hook

// Note recoil is working only til react 18.0.0 and react-dom 18.0.0

// so you will be needed to do the following steps to use recoil
// 1. npm uninstall react react-dom
// 2. npm install react@18.0.0 react-dom@18.0.0


// Every dynamic part of your app can be put inside an atom.

// Selector -- A selector is something that can be derived from other atoms or selectors. It is similar to useMemo.
// It is something that does not depend on any other external source or backend.


// Selector syntax

// export const totalNotificationSelector = selector({
//     key: "totalNotificationSelector",
//     get: ({get}) => {
//         const networkNotification = get(networkAtom);
//         const jobsNotification = get(jobsAtom);
//         const messagingNotification = get(messagingAtom);
//         const notification = get(notificationAtom);
//         return networkNotification + jobsNotification + messagingNotification + notification;
//     }
// })
// the get function is used to get the value of the atom or selector. It ensures that any time the value of the atom or selector changes, the selector is re-evaluated.



// use 7.4-backend folder for the server
// Asynchronous data queries
//  the default value of an atom must have a synchronous object or a selector which can be asynchronous. (basically, you can put the fetch logic there)
// But this will cause an intial white screen which can be fixed with a loader



// atomFamily
// Problem  - Sometimes you need more than one atom for your use case 
// For example - Creating a todo application

// atoms work when you know something is present only once on the screen.
// you need to create dynamic atoms. Also, two todos with the same id must point to the same atom and two todos with different id must point to different atoms. This is where atomFamily comes into play

// atomFamily is a function in Recoil that lets you create multiple atoms dynamically based on parameters. Instead of defining separate atoms for similar data, atomFamily allows you to create atoms on demand using a unique key.

// Why Use atomFamily?
// When you need multiple atoms with the same structure but different values.
// To manage lists of items (e.g., user profiles, to-do items) without defining separate atoms manually.
// Efficient memory usage, as atoms are only created when needed.

// atomFamily is a way to create multiple atoms dynamically using a function. Instead of making separate atoms for each item, atomFamily generates them when needed.

// atomFamily is a function which basically returns to you an atom.

// atomFamily also provides memoization of the functions so basically whatever values it is returning are cached so that when you call them the next time they all are the same.


// The find() function in JavaScript is used to search for the first element in an array that matches a condition. If no element is found, it returns undefined.







// Selector Family
// selectorFamily is like selector, but it lets you create dynamic selectors based on parameters. Instead of making separate selectors for each case, you can generate them dynamically.

// Why Use selectorFamily?
// ✅ Filter or compute data dynamically based on an ID or condition.
// ✅ Avoid creating multiple selectors manually.
// ✅ Efficient—only recomputes when needed.
// ✅ Useful for filtering lists, fetching data by ID, or computing specific results dynamically.

// Syntax -
// export const todosAtomFamily = atomFamily({
//     key: 'todosAtomFamily',
//     default: selectorFamily({
//       key: "todoSelectorFamily",
//       get: (id) => async ({get}) => {
//         const res = await axios.get(`http://localhost:3000/todos?id=${id}`);
//         return res.data;
//       },
//     })
//   });


// 1️⃣ selector → Static Derived State (Same for Everyone)
// ✅ Computes a derived state from atoms or other selectors.
// ✅ Fixed behavior → No parameters, same value for all components.
// ✅ Re-renders only when dependencies change.


// 2️⃣ selectorFamily → Dynamic Derived State (Different for Each Input)
// ✅ Creates selectors dynamically based on a parameter.
// ✅ Each instance can compute a different value.
// ✅ Efficient → Only recomputes the required instance.


// ✔ Use selector → When the computed state is the same for all components (e.g., total count of completed tasks).
// ✔ Use selectorFamily → When the computed state depends on a parameter (e.g., fetching details of a specific todo).




// useRecoilStateLoadable and useRecoilValueLoadable 
// These hooks are used in Recoil when dealing with asynchronous state (selectors fetching data from an API, database, etc.). 

// {
//     contents
//     state
// }

// They help handle different loading states like "loading," "has value," or "has error."

// if (todo.state === "loading") {
//     return <div>loading</div>
// }

// return (
//  <>
//    {todo.contents.title}
//    {todo.contents.description}
//    <br />
//  </>
// )





// Suspense, ErrorBoundary
//  Suspense doesn't trigger if you use useRecoilStateLoadable or useRecoilValueLoadable
// Suspense is used to show a fallback UI while the component is loading. It is used with lazy loading.

// ErrorBoundary is used in class components to catch errors in the child component tree. It is used to handle errors in the render phase of the component lifecycle. It is similar to try-catch block in JavaScript