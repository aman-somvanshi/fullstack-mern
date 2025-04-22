// Routing - Great thing to know
// Prop drilling - interview question
// Context API - good to know


// Routing

// Single page applications - React is a single page application. It is a type of web application that loads only one HTML page and dynamically updates the content without refreshing the page when the user interacts with it. 


// In pre-react days, we used to do hard reload to get different pages of the website.
// But in React, hard reload is done only once and all the other components are shown on the page using Client Side Routing.


// Client Side Routing - It is a technique used to load different components on the same page without refreshing the page. It is done using React Router.


// Client Side Bundle - A client-side bundle is a packaged version of all the JavaScript, CSS, and other assets needed for a web app to run in the browser.



// Before Bundling (Multiple Files)

// index.js (Main app logic)
// style.css (Styling)
// helper.js (Helper functions)
// The browser loads them separately, which takes time.

// After Bundling (One Optimized File)
// bundle.js → Contains all JavaScript & styles in one file or split into smaller chunks.


// How to do routing in react?
// react-router-dom

// npm install react-router-dom

//  Now you may see the class-7-1-app folder.

// useNavigate - It is a hook that returns a navigate function that you can use to navigate to a different route.
// It makes sure that it is not doing a hard reload of the page. It is simply changing the route keeping the same client side bundle and changing the component on the page (since the route is changed).


// You can not use useNavigate outside of the BrowserRouter. It should be inside the BrowserRouter component.



// Lazy Loading -  Up until now, we have been importing all the components at the start of the application. But what if we have a large application with a lot of components? It will take a lot of time to load the application because all the components come in the client-side bundle. To avoid this, we can use lazy loading. Lazy loading is a technique in which we load the component only when it is needed. This way, the initial load time of the application is reduced.


// without writing default , you would be importing Dashboard like this:
// import { Dashboard } from "./components/Dashboard";

// you can have multiple exports from a file such as:
// export const a = 1;
// export const b = 2;

// But there can be only one default export in a file.

// and with default, you would be importing Dashboard like this:
// import Dashboard from "./components/Dashboard";

// Suspense API is used to show a fallback UI while the component is loading. It is used with lazy loading.
// It is used when you have asynchronous component fetching or asynchronous data fetching.








// Prop Drilling -- dicussed in class-7-2-app

// Prop drilling is a term used in React to describe the process of passing data (props) through multiple layers of components in the component tree, even when some of the intermediate components do not directly use the data. Instead, they simply pass it down to their children.

// Prop drilling is not a bad thing because it causes re-renders. Instead, it is a bad thing because it makes the code visually unappealing.

// Prop drilling doesn’t mean that parent re-renders children . It just means the syntactic uneasiness when writing code



// For state management, it is said that you should push the state variables down the component tree as much as possible. State variables should be put in LCA (Lowest Common Ancestor) of the components that need them.







// Context API  -- discussed in class-7-2-app

// It lets you fix prop drilling.

// Wouldn’t it be great if there were a way to “teleport” data to the components in the tree that need it without passing props? With React’s context feature, there is!

// The Context API is a feature in React that allows you to share data (like state, functions, or configuration) across the entire component tree without explicitly passing props through every level of the tree. It solves the problem of prop drilling by providing a way to make data available to all components in the tree, regardless of their depth.

// It lets you keep all state logic outside of your core react component.

// So there are 3 steps to use context API:
// 1. Create a context (using createContext)
// 2. Create a provider (using the context.provider)
// 3. Use the context (using useContext)
