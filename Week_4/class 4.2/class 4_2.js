// State is a very long object that contains the structure of your application

// Problem with DOM manipulation is that for developers , it is hard to build dynamic websites using it.
// Moreover, backends don't return you back functions but data. So basically, it won't tell you to add a todo, remove a todo, or update a todo. Instead, it will return you a long object that contains the data of the todo. This long object is called state.

// PROBLEM STATEMENT :

// State --> Function() that puts the state on the DOM ---> Required Output or UI

// Two steps -
// 1. Clear the parent element
// 2. Place the updatedTodo on every element

// What is the easiest way to create a dynamic frontend website? 
// 1. Update a state variable 
// 2. Delegate the task of figuring out diff to a hefty function 
// 3. Tell the hefty function how to add, update and remove elements

// npm create vite@latest


// React is there to identify the difference beween the old state and the new state. 

// React-DOM is used when react is being used in the context of a web application or on the browser.
// Its main function is to update the DOM based on the changes in the state of the application.

// Similarly, React-Native is used when react is being used in the context of a mobile application.
// Its main function is to update the mobile application based on the changes in the state of the application.

// npm run dev