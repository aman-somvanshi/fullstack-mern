// Initializing a variable with a type

// let x: number = 101;
// // x="aman"; // This will cause a type error since x is declared as a number . Error - Type 'string' is not assignable to type 'number'.
// console.log(x);




// Giving types to function arguments

// function greet(fname: string, lname: string){
//     console.log("Hello " + fname + " " + lname);
// }

// greet("Aman", "Somvanshi");
// // greet(777); // Error - Argument of type 'number' is not assignable to parameter of type 'string'.




// Giving types to function arguments and return type

// function sum(a:number, b: number): number{
//     // return "Aman";//Type 'string' is not assignable to type 'number'.
//     return a + b;
// }
// // Even if we do not give the return type of the function here, typescript was able to infer the type (because it knows if you add two numbers, it will return a number). This is called type inference. 

// const value = sum(2,3);
// console.log(value);



// function isLegal(age: number) {
//     if(age>18)
//         return true;
//     else
//         return false;
// }

// let x = isLegal(21); // if you hover over x, you will see that typescript inferred the type of x to be boolean.
// console.log(x);
// console.log(isLegal(5));



// Giving a function as input to another function

// function delay(callbackFn: () => void) { // callbackFn expects nothing as the input and passes void as the output
//     setTimeout(callbackFn, 5000);
// }

// delay(() => {
//     console.log("Khushi is a fool");
// })







// tsconfig file -

// const greet = (name: string) => `Hello, ${name}!`;

// console.log(greet("Aman"))



//  noImplicitAny = true

// const greet = (name) => `Hello, ${name}!`; // Parameter 'name' implicitly has an 'any' type.
// So, it couldn't be compiled


//  noImplicitAny = false  ==> this makes our code base slightly less strict
// const greet = (name) => `Hello, ${name}!`; 
// console.log(greet("Aman"));
// It got compiled


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






// Interfaces

// const user = {
// 	firstName: "aman",
// 	lastName: "somvanshi",
// 	email: "email@gmail.com",
// 	age: 21
// }

// interface User {
// 	firstName: string;
// 	lastName: string;
// 	email?: string; // The question mark here means that this property is optional. So user can have an email or not.
// 	age: number;
// }

// function isLegal(user: User): boolean {
//     if(user.age > 18)
//         return true;
//     else
//         return false;
// } 

// console.log(isLegal(user));



// Implementing interfaces

// interface Person {
//     name: string;
//     age: number;
//     greet(phrase: string): void;
// }

// class Employee implements Person {
//     name: string;
//     age: number;

//     constructor(n:string, a: number){
//         this.name = n;
//         this.age= a;
//     }

//     greet(phrase: string) : void {
//         console.log(`${phrase} ${this.name}`);
//     }
    
// }


// const e = new Employee("Aman", 23);
// console.log(e.name);

// This is useful since now you can create multiple variants of a person (Manager, CEO …)









// Types

// type User = {
// 	firstName: string;
// 	lastName: string;
// 	age: number
// }

// Types let you do a few other things - 

// 1. Unions

// Let’s say you want to print the id of a user, which can be a number or a string.

// type StringOrNumber = string | number;

// function printId(id: (string | number)) {
//   console.log(`ID: ${id}`);
// }
// Either you can do the above or follow the below way - 

// function printId(id: StringOrNumber) {
//   console.log(`ID: ${id}`);
// }

// printId(101); // ID: 101
// printId("202"); // ID: 2024


// You can’t define a union type like string | number using interface directly, but you can use it inside interface properties.

// 2. Intersection
// What if you want to create a type that has every property of multiple types/ interfaces

// type Employee = {
//   name: string;
//   startDate: Date;
// };

// type Manager = {
//   name: string;
//   department: string;
// };

// type TeamLead = Employee & Manager;
// So if you ever want to do an OR (union) or AND (intersection) between interfaces, you need to make use of types.

// const teamLead: TeamLead = {
//   name: "aman",
//   startDate: new Date(),
//   department: "Software developer"
// };

// interface and type are very similar — both are used to describe the shape of objects — but they have some key differences.

// Interview Question -
// What is the difference between type and interface in TypeScript?

// ❌ interface cannot create unions
// ✅ type can create unions and intersections













// Arrays in TS

// function maxValue(arr: number[]){
//     let max = 0;
//     for(let i=0; i<arr.length;i++){
//         if(arr[i]>max)
//             max = arr[i];
//     }
//     return max;
// }

// console.log(maxValue([2,55,6,22,77,43]));


interface User {
    firstName: string;
    lastName: string;
    age: number;
}

function isLegal(users: User[]){
    return users.filter(x => x.age>18);
}

console.log(isLegal([{
    firstName: "Aman",
    lastName: "Somvanshi",
    age: 21
}, {
    firstName: "Raman",
    lastName: "Singh",
    age: 16
}, ]));

