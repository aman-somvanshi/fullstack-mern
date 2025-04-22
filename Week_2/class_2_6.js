// map, filter, arrow fns

//ARROW FNs

// function sum(a,b){
//     return a+b;
// }

// const sum = (a,b) => {
//     return a+b;
// }

// app.get("/", function(req, res) {
    
// })

// app.get("/", (req, res) => {

// })

// const ans = sum(1,2);
// console.log(ans);


//Problem statement:
//given an array, give me back a new array in which every value is multiplied by 2
// [1,2,3,4,5]
// [2,4,6,8,10]




//method 1
const input = [1,2,3,4,5];

// const newArray = [];
// for(let i=0;i<input.length;i++){
//     newArray.push(input[i]*2);
// }

// console.log(newArray)




// Method 2  --> MAP FUNCTION

// function transform(i){
//     return i*2;
// }

//we essentially want this (not correct syntax here)--> map(input, transform); //[2,4,6,8,10]

// const ans = input.map(transform);// This would work as it is still the right syntax
//Usual syntax is --> 

// const ans = input.map(function (i){
//     return i*2;
// })
// console.log(ans);



// Asssignment --> create a map function that takes 2 inputs - an array and a transformation callback fn and transforms the array into a new one using the transformation fn

const map = (array, transformFunction) => {
    let newArr=[];
    for(let i=0;i<array.length;i++){
        newArr.push(transformFunction(array[i]));
    }
    return newArr;
}

const tri = (n) =>{
    return n*3;
}

const sol = map([1,2,3,4,5], tri);
console.log(sol);




//FILTERING

//problem statement --> given an input array, give me back all the even values from it

const arr = [1,2,3,4,5];

//Method -1

// const newArr = [];
// for (let i=0;i<arr.length;i++){
//     if(arr[i]%2==0){
//         newArr.push(arr[i]);
//     }
// }

// console.log(newArr);


// //Method - 2 --> FILTER Function
// function filteringLogic(n){
//     if(n%2==0)
//         return true;
//     else
//         return false;
// }

// const ans = arr.filter(filteringLogic);  //Syntax usually not used
// More used syntax -->
// const ans = arr.filter(function (n){
//     if(n%2==0)
//         return true;
//     else
//         return false;
// })
// console.log(ans);


//Another example
// const users =["aman","chinki","rinki","pinki"];
// const ans = users.filter(function(name){
//     if(name.startsWith("c"))
//         return true;
//     else
//         return false;
// })
// console.log(ans);


//So array can be of anything, what matters is the individual element of the array

//Combining filter and arrow functions

// const ans = arr.filter((n) =>{
//     if(n%2==0)
//         return true;
//     else
//         return false;
// })
// console.log(ans);






