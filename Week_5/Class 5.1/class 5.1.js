// Why do you need React?
// For static websites, you don't
// For dynamic websites, these libraries make it easier to do DOM manipulation

// React is just an easier way to write normal HTML/CSS/JS 
// It’s a new syntax, that under the hood gets converted to HTML/CSS/JS

// Browser only understands HTML/CSS/JS. It doesn't understand react syntax.


// Why React?

// People realised it’s harder to do DOM manipulation the conventional way 

// There were libraries that came into the picture that made it slightly easy, but still for a very big app it’s very hard (JQuery) 

// Eventually, VueJS/React created a new syntax to do frontends 

// Under the hood, the react compiler convert your code to HTML/CSS/JS


// To understand react completely, you must know 3 things:
// 1. State
// 2. Components
// 3. Re-rendering


// Creators of frontend frameworks realised that all websites can effectively be divided into two parts:
// 1. State
// 2. Components


// STATE:

// A javascript object that represents the current state of the app
// It represents the dynamic things in your app (things that change) 
// For example, the value of the counter

// Anything on your website that changes is held in the state. Rest everything is not a part of the state.

//  For the counter app, the state would be:

// {
//     count: 0
// }


// COMPONENTS:

// How a DOM element should render, given a state 
// It is a re-usable, dynamic, HTML snippet that changes given the state
// State/Components/Re-rendering

// For the counter app, the component would be:
// This button is a component 
// It takes the state (currentCount) as an input 
// And is supposed to render accordingly


// RE-RENDERING:

// A state change triggers a re-render 
// A re-render represents the actual DOM being manipulated when the state changes


// you usually have to define all your components once 
// And then all you have to do is update the state of your app, React takes care of re-rendering your app

// You'll be basically writing a few things in react like -
// 1. A global state
// 2. Components
// 3. State-update function which triggers re-rendering

// The emulated react library in index.html is getting back the component given your state, and then updates your DOM.

// Check index.html now

// const arr = [1,2];
// const [a, b] = arr;
// console.log(a, b); // 1 2

// Now, we have created the react project counter-app

// JSX  - A js file inside which you can write both js and xml

// the dist folder contains the compiled version of the react code in the form of an html and js file. With the help of these two files, the app can be rendered. You don't need any other files to run the app.


