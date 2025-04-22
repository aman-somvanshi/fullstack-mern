function findSum(n) {
    let ans = 0;
    for (let i = 0; i<n; i++) {
      ans += i;
    }
    return ans;
  }
  
  function findSumTill100() {
    console.log(findSum(100));
  }
  
  //Synchronous function
  //BUSY WAITING
  function syncSleep() {
      let a = 1;
    for (let i = 0; i<1000000000; i++) {
        a++;
    }
}
//   syncSleep();
//   findSumTill100();
// setTimeout(findSumTill100, 1000)//async function
//   console.log("hello world");//Notice how this is printed before the findSumTill100 function is called even tho hello world is written after the function call

  //This happened because setTimeout is an async function

  // Common async functions
  //   setTimeout
  //   fs.readFile
  //   fetch

// const fs = require("fs"); // require is a node.js function that imports a module
// fs.readFile("a.txt", "utf-8", function(err, data){
//     console.log(data);
// })
// console.log("Hi there from the javascript file");
//notice how the console.log statement is printed before the data from the file is printed - just because the readFile function is an async

// let a = 0;
// for(let i = 0; i<1000000000; i++){// This takes longer to execute than the readFile function
    // a++;
// }

// console.log("Hi there2");

//Now the question arises that after node.js logs the Hi there from the javascript file will it print Hi there 2 first or the data from the file first?

//Answer - In javascript, even if the async function is resolved...until the thread becomes idle(which it does when the entire execution is complete ), it will not print the async function's result.
//So, the output will be:
// Hi there from the javascript file
// Hi there2
// "Hi there from a.txt"



// JavaScript Architecture

//4 THINGS -

//1. Call Stack --> where the statements are executed
//2. Web APIs --> where the async functions are executed
//3. Callback Queue --> where the async functions are stored while they are waiting to be executed
//4. Event Loop --> checks if the call stack is empty and if it is, it takes the first function from the callback queue and puts it in the call stack

//Callbacks are not usually used for synchronous functions but are used mainly for async functions


//Promises

//Promises are syntactical sugar that makes the code look cleaner but under the hood, it is still a callback function

//A Promise can be in 3 states: 1. Pending 2. resolved 3. rejected
// var d = new Promise(function(resolve){
//   setTimeout(function(){
//     resolve("foo");
//   }, 1000)
  
// })
// // console.log(d);
// function callback(){
//   console.log(d);
// }

// console.log(d);
// d.then(callback);

function kiratsAsyncfunction(){
  let p = new Promise(function(resolve){
    //do some async logic here
    setTimeout(function(){
      resolve("Hi there from resolve");
    }, 3000)
  })
  return p;
}

async function main(){
  // no callbacks, no .then syntax
  // kiratsAsyncfunction.then(function(value){
  //   console.log(value);
  // })
  let value = await kiratsAsyncfunction();
  console.log(value);// Hi there from resolve
  console.log("Hi there from main");// So you noticed that this is not printed until the async function is resolved, this is because of the await keyword as it waits for the async function to resolve
}

main();
console.log("Hi there after main")
// Output - 
// Hi there after main
// Hi there from resolve
// Hi there from main

//Hence you also noticed that the last log statement is printed before the async function is resolved, hence signifying that the thread does not get busy waiting for the async function to resolve