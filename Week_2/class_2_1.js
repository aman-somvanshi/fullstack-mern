// console.log("start");

// setTimeout(function () {
//   console.log("Hi from the outer callback function");
//   setTimeout(innerCallback, 5000);
//   console.log("After the inner callback function");
// }, 5000);

// console.log("After the outer callback function");

// function innerCallback() {
//   console.log("Hi from the inner callback function");
// }

//Output -
// start
// After the outer callback function
// Hi from the outer callback function
// After the inner callback function
// Hi from the inner callback function

// setTimeout(secondCallback, 5000);

// console.log("After the second callback function");

//Non Promisified function
// 1. does not return anything
// 2. takes a callback function as an argument

// Promisified function
// 1. returns a promise
// 2. does not take a callback function as an argument


// Non - Promisified function

// function myOwnSetTimeout(cb, duration) {
//     setTimeout(function() {
//         cb();
//     }, duration);
// }
// myOwnSetTimeout(function(){

// }, 10000);


// Promisified function
function promisifiedMyOwnSetTimeout(duration){
    const p = new Promise(function(resolve){
        setTimeout(function () {
            resolve();
        }, duration);
    });
    return p;
}

//async await syntax , promise chaining are things that help to get rid of callback hell
const ans = promisifiedMyOwnSetTimeout(1000);
console.log(ans);
ans.then(function(){
    console.log("timeout is done");
})

// Async calls are usually made in the following cases -
// 1. do a network call
// 2. sleep/wait for some time
// 3. read a file
// 4. database call

// you must know how to call a promisified function

function sum(a, b){
    return new Promise(function(resolve){
      resolve(a+b);
    })
  }
  sum(5,5).then(function(ans){
    console.log(ans); //10
  })