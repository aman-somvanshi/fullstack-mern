// We will now be making the front-end of our medium application. We will also be changing some of the details inside the routes made in the backend to suit our front-end.

// Step 1 - Initialize the FE project

// 1. Initialise a react app
// npm create vite@latest
// Name the project - frontend
// Choose React
// Choose typescript

// Do the standard things - go to src/ App.css and src/index.css and remove everyhting

// 2. Initialise Tailwind - Follow tailwind docs
// npm install tailwindcss @tailwindcss/vite
// Add the @tailwindcss/vite plugin to your vite.config.ts
// Add @import "tailwindcss"; to your App.css


// 3. Install the common package that we have created earlier for this application
// npm install @aman_somvanshi/medium-blog-common
// Also clean App.tsx



// Step 2 - Add react-router-dom
// npm i react-router-dom
// Add routing (ensure you create the Signup, Signin and Blog components)
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import { Signup } from './pages/Signup'
// import { Signin } from './pages/Signin'
// import { Blog } from './pages/Blog'

// function App() {

//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/signin" element={<Signin />} />
//           <Route path="/blog/:id" element={<Blog />} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   )
// }

// export default App


// Step 3 - First we build SignUp.tsx and then we build Quote.tsx and Auth.tsx

// Step 4 - You need to make Auth.tsx such that you can re-use it for both the signup screen and the sign=in screen. Ideally, you should be re-using components inside it. But for this case, it can work the way we are going.

// Note - While building the front-end, you can make use of components which are available online such as buttons, input box. Just make sure they are made for tailwind.

// Step 5 - Now install axios.

