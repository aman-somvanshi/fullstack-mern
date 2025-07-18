// Enums in TS

// Enums (short for enumerations) in TypeScript are a feature that allows you to define a set of named constants.
// The concept behind an enumeration is to create a human-readable way to represent a set of constant values, which might otherwise be represented as numbers or strings.

// So enums basically made things slightly more human-readable.This makes code slightly cleaner to read out.

// enum does not exist as a keyword in JavaScript, but TypeScript compiles it down to a JavaScript object.

// Autocompletion and Error Reduction: Code editors provide autocompletion for enums

// The final value stored at runtime is still a number (0, 1, 2, 3). 

// enum Direction {
//     Up, // 0
//     Down, // 1
//     Left, // 2
//     Right // 3
// }

// console.log(Direction.Up); gave 0 as ouptut.

// enum Direction {
//     Up = "up", 
//     Down = "down", 
//     Left = "left", 
//     Right = "right"
// }

// So in an enum, either you don't assign any value, in which case it will be auto-incremented starting from 0, or you assign a value (a string in most cases) to each member of the enum.

// enum Direction {
//     Up = 1, // 1
//     Down, // 2
//     Left, // 3
//     Right // 4
// }

// So you can also assign a value to the first member of the enum, and the rest will be auto-incremented from that value.


// Common usecase of enum in express

// const app = express();
// enum ResponseStatus {
//     Success = 200,
//     NotFound = 404,
//     Error = 500
// }

// app.get("/', (req, res) => {
//     if (!req.query.userId) {
// 			res.status(ResponseStatus.Error).json({})
//     }
//     // and so on...
// 		res.status(ResponseStatus.Success).json({});
// })

// app.get("/', (req, res) => {
//     if (!req.query.userId) {
// 			res.status(ResponseStatus.Error).json({})
//     }
//     // and so on...
// 		res.status(ResponseStatus.Success).json({});
// })

// So if we ever want to change the status code for two routes in one go, we can change the status code in the enum directly.












// Generics
// Generics are a language independent concept (exist in C++ as well)

// Refer to b.ts for the code in ts-remaining folder

// Let’s say you have a function that needs to return the first element of an array. Array can be of type either string or integer.
// What is the problem in this approach provided in the code ?
// User can send different types of values in inputs, without any type errors
// Typescript isn’t able to infer the right type of the return type


// Generics enable you to create components that work with any data type while still providing compile-time type safety.

// You can think of generics as being able to create multiple versions of a function, each tailored to a specific type, without having to write multiple versions of the function.

// Do refer to b.ts because it is really important to understand Generics.






// Exporting and importing modules
// TypeScript follows the ES6 module system, using import and export statements to share code between different files.
// const express = require("express");// This is what we've been using so far

// import express from "express"; // This is the ES6 way of importing modules

// we've been using this for exports -
// module.exports = {
//     a: 1
// }
// export const a = 1; // use this ES6 syntax

// if you export like this -
// export const a = 1;
// export const b = 2;

// then you import these in another file like this 
// import {a,b} from './b'

// if you exports like this
// const a = 1;
// export default a;

// then you import these in another file like this 
// import a from './b'

// In fact for default exports, you can give them any name while importing

import aman from './b';
console.log(aman); // Ouptut --> 1 (because the default export is a)