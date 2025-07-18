// function doSomething(keyPressed: string) {
// 	// do something.
// }

// type KeyInput = "up" | "down" | "left" | "right";

// enum Direction {
//     Up, // 0
//     Down, // 1
//     Left, // 2
//     Right // 3
// }


// function doSomething(keyPressed: KeyInput) {
// 	// do something.
// }

// function doSomething(keyPressed: Direction) {
// 	// do something.
// }

// doSomething("up");
// doSomething("down");
// doSomething("downrandomg"); // We are trying to enforce that typescript tells us that this is not a valid option directly at the time of compilation. After changing the function input type to KeyInput, we will face an error on this line


// doSomething(Direction.Up);
// doSomething(Direction.Down);
// console.log(Direction.Down);
// console.log(Direction.Up);

// So enums basically made things slightly more human-readable.This makes code slightly cleaner to read out. 

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

// type Input = number | string;

// function firstEle(arr: Input[]) {
//     return arr[0];
// }


// 1st problem  --> Typescript isn’t able to infer the right type of the return type
// const value = firstEle(["aman", "som"]);
// console.log(value.toUpperCase()); // This gives an error because typescript is assuming that value is of the type Input.
// Ideally, this shouldn't have caused an error.


// 2nd problem  --> User can send different types of values in inputs, without any type errors

// const value1 = firstEle(["aman", "som", 1, 2]); // notice that how this array is accepting both strings and nubers as input which we wouldn't ever want to happen

// One way to fix the 2nd problem would be to write type like this
// type Input = number[] | string[];
// function firstEle(arr: Input) {
//     return arr[0];
// }




// Solution --> Generics

function identity<T>(arg: T): T {
    return arg;
}

let output1 = identity<string>("myString"); // Typescript was able to figure out that the argument is of string type and the function will return a string.
let output2 = identity<number>(100);// Typescript was able to figure out that the argument is of number type and the function will return a number.

// You can think of generics as being able to create multiple versions of a function, each tailored to a specific type, without having to write multiple versions of the function.

output1.toUpperCase(); // This can be done because typescript knows ouptut1 will be a string.


// Solution to the original problem

function firstEle<T>(arr: T[]): T{
    return arr[0];
}

// const value = firstEle<string>(["aman", "somvanshi"]);
// console.log(value.toUpperCase());
// const value1 = firstEle<number>([0,1,2]);

// Now you can see value and value1 are being inferred as the correct return type.
// Also, user isn't able to send different types of values in the same array. (e.g., string and numbers cannot be sent in the same array)

const value = firstEle(["aman", "somvanshi"]);
// So we don't have to explicitly provide the generic here. TypeScript figures it out
const value1 = firstEle([0,1]); // return type --> number
const value2 = firstEle([true, false]); // return type --> boolean

// but then beware

const value4 = firstEle([1,2,3, "aman"]); // return type --> string | number

interface User{
    name: string;
}

const value5 = firstEle<User>([{name: "aman"}]);// return type --> User
value5.name

