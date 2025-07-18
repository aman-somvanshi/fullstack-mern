// Typescript

// Types of Languages

// Strongly typed vs Loosely Typed

// The terms strongly typed and loosely typed refer to how programming languages handle types, particularly how strict they are about type conversions and type safety.

// Strongly typed languages

// Examples - Java, C++, C, Rust
// Benefits - 
// 1. Lesser runtime errors
// 2. Stricter codebase
// 3. Easy to catch errors at compile time


// Loosely typed languages

// Examples - Python, Javascript, Perl, php
// Benefits
// 1. Easy to write code
// 2. Fast to bootstrap
// 3. Low learning curve

// People realised that javascript is a very power language, but lacks types. Typescript was introduced as a new language to add types on top of javascript.







// What is typescript?

// TypeScript is a programming language developed and maintained by Microsoft. 
// It is a strict syntactical superset of JavaScript and adds optional static typing to the language.
// Refer to image - typescript superset


// !!!!!!!!!!!!! VERY IMPORTANT STUFF !!!!!!!!!!!!!


// Where/How does typescript code run?

// Refer to image - how typescript executes.

// Typescript code never runs in your browser. Your browser can only understand javascript. 
// 1. Javascript is the runtime language (the thing that actually runs in your browser/nodejs runtime)
// 2. Typescript is something that transpiled down to javascript
// 3. When typescript is compiled down to javascript, you get type checking (similar to C++). If there is an error, the conversion to Javascript fails. 

// In fact, Typescript never runs at all.




// Typescript compiler
// tsc is the official typescript compiler that you can use to convert Typescript code into Javascript
// There are many other famous compilers/transpilers for converting Typescript to Javascript. Some famous ones are - 
// 1. esbuild
// 2. swc


// Step 1 - Install tsc/typescript globally
// npm install -g typescript

// Step 2 - Initialize an empty Node.js project with typescript
// mkdir node-app
// cd node-app
// npm init -y (it will create a package.json file)
// npx tsc --init (or tsc --init) (it will create a tsconfig.json file)

// These commands should initialize two files in your project
//  package.json and tsconfig.json

// package.json --> mainly contains the dependencies of the project, name and version of the project

// tsconfig.json --> This file contains a bunch of configurations that determine how do you want to convert the typescript file to javascript file.


// Step 3 - Create a a.ts file

// Step 4 - Compile the ts file to js file
// tsc -b

// Note - the final file that is run is the javascript file

// Step 5 - Explore the newly generated a.js file
// Notice how there is no typescript code in the javascript file. It’s a plain old js file with no types

// You don't ever have to look at the javascript file created by the typescr ipt compiler.

// Step 7 - Delete a.js
// At this point, if you try assigning a string to the number type variable and then try compiling the ts file, it will lead to an error. Hence, no js file is created by executing tsc -b.

// This is the high level benefit of typescript. It lets you catch type errors at compile timeThis is the high level benefit of typescript. It lets you catch type errors at compile time

// Note- You should add your dist folder to .gitignore file so that the generated javascript files are not pushed to the git repository.









// Basic Types in TypeScript

// Typescript provides you some basic types
// number, string, boolean, null, undefined, any.
// Let’s create some simple applications using these types -


// Refer a.ts in node-app folder
// 1. Initializing a variable with a type
// 2. Giving types to function arguments
// 3. Giving types to function arguments and return type
// 4. Giving a function as input to another function


// Type Inference in TypeScript - 
// Even if we do not give the return type of the function here, typescript was able to infer the type. This is called type inference.

// ❓ What is any in TypeScript?
// The any type tells TypeScript:
// “I don’t know what this value is — skip type checking for it.”











// The tsconfig file

// 1. target
// The target option in a tsconfig.json file specifies the ECMAScript target version to which the TypeScript compiler will compile the TypeScript code.
// Old browsers (like Internet Explorer) may not support the latest ECMAScript features, so you can set the target to an older version like ES5 or ES2015 (ES6) to ensure compatibility.
// Old ECMAScript versions didn't have arroe functions.
// To try it out, try changing the target to "es5" in the tsconfig.json file and then run the tsc -b command again. You will see that the arrow function is converted to a regular function in the generated JavaScript file.


// 2. rootDir
// Where should the compiler look for .ts files. Good practise is for this to be the src folder


// 3. outDir
// Where should the compiler look for spit out the .js files.

// 4. noImplicitAny
// Try enabling it and see the compilation errors on the following code - 
// const greet = (name) => `Hello, ${name}!`;
// Then try disabling it
// noImplicitAny = false  ==> this makes our code base slightly less strict

// 5. removeComments
// Whether or not to include comments in the final js file
// if removeComments is set to true, the comments will be removed from the final js file

// Note: In TypeScript, you don't really have to use semicolons at the end of each line.



// Good Question -

// function runAfter5s(fn: () => void) {
//     setTimeout(fn, 5000);
// }
// runAfter5s(() => {
//     console.log("Hey")
//     return 5;
// })

// ❓ Why does it run even though fn: () => void and you're returning 5?
// It is accepted because TypeScript only checks that void means "we don't care what it returns" — not that it can't return anything.
// ✅ In TypeScript:
// () => void means the function can return a value, but that value will be ignored.
// If you really want to restrict it, Use () => undefined instead of () => void







// Interfaces in TypeScript

// How can you assign types to objects?
// To assign a type to an object, you can use interfaces.

// interface User {
// 	firstName: string;
// 	lastName: string;
// 	email?: string; // The question mark here means that this property is optional. So user can have an email or not.
// 	age: number;
// }

// do check the App.tsx file in the ts-react-project folder for an example of how to use interfaces in React

// 2. Implementing interfaces

// Interfaces have another special property. You can implement interfaces as a class.
// Refer to a.ts in node-app folder

// So basically, we can create an interface which is implemented by a class. You can create multiple classes that use the same interface.

// This is useful since now you can create multiple variants of a person (Manager, CEO …)

// Interfaces help ensure that the class has all the properties and methods defined in the interface. If you try to create a class that does not implement all the properties and methods, it will lead to a compile time error.

// Summary
// You can use interfaces to aggregate data
// You can use interfaces to implement classes from.












// Types

// What are types?
// Very similar to interfaces , types let you aggregate data together.

// type User = {
// 	firstName: string;
// 	lastName: string;
// 	age: number
// }

// You don't have to use "=" in case of declaring interfaces, but you have to use "=" in case of declaring types.

// Types and interfaces are very similar,  both let you aggregate data together.
// You cannot use types to implement classes. You can only use interfaces to implement classes.

// But Types let you do a few other things.
// Refer a.ts for the following - 
// 1. Unions --> Let’s say you want to print the id of a user, which can be a number or a string.
// 2. Intersections --> What if you want to create a type that has every property of multiple types/ interfaces


// So if you ever want to do an OR (union) or AND (intersection) between interfaces, you need to make use of types.

// Use Case	
// Defining object shapes/classes --> Prefer	interface
// Working with unions & primitives	--> Prefer type

// interface and type are very similar — both are used to describe the shape of objects — but they have some key differences.

// Interview Question -
// What is the difference between type and interface in TypeScript?

// ❌ interface cannot create unions
// ✅ type can create unions and intersections

// interfaces can use extends, but types cannot use extends





















// Arrays in TypeScript
// If you want to access arrays in typescript, it’s as simple as adding a [] annotation next to the type









// Duplicate Function Implementation Error

// function greet(name: string): void {
//   console.log("Hi " + name);
// }

// function greet(age: number): void {
//   console.log("Age is " + age);
// }

// ⛔ This gives an error:
// Duplicate function implementation.
// Because TypeScript allows function overloading — but only one implementation is allowed.

// ✅ Correct Way: Function Overloading in TypeScript
// Use multiple overload signatures and one implementation:

// function greet(name: string): void;
// function greet(age: number): void;
// function greet(value: any): void {
//   if (typeof value === "string") {
//     console.log("Hi " + value);
//   } else {
//     console.log("Age is " + value);
//   }
// }


// The top two are overload signatures (just declarations)

// The third one is the actual implementation

// You may want to study the concept of Ambient Modules in TypeScript.














// Difference between abstract class and interface in TypeScript


// What is an Interface?

// Blueprint: Think of an interface as a rulebook or contract. It only describes what properties and methods a class must have, not how they work.
// No Implementation: You cannot write any actual code inside an interface; it just lists what’s required.
// No Instantiation or Constructors: You can’t “make” an interface or add a constructor to it.


// What is an Abstract Class?

// Partial Blueprint and Code: An abstract class is like a half-finished building. It can contain both “abstract” methods (no code, must be filled in by child classes) and real, working methods.
// Can Store State and Logic: You can write shared code in an abstract class that all subclasses will use.
// Constructors Allowed: Abstract classes can have constructors to set up common properties.






