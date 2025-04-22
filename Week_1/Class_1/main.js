// let - for variables whose values change throughout the program
// var - not used any more
// const - a variable whose value does not change throughout the program

let fname = 'Aman'
let age = 18
let isMarried = false

// console.log("This person's name is " + fname + " and his age is "+ age + "." );
// console.log("Is he married ? "+ isMarried);

if (isMarried) {
    // console.log(fname + " is married .");
} else {
    // console.log(fname + " is not married .");
}

//Sum
// let sum =0 
for (let i = 0; i <= 100; i++) {
    // sum = sum + i;
  
}

// console.log(sum);


const personArray = ['Aman', 'Aayush', 'Akshat', 'Himanshu'] 
// console.log(personArray);
for (let i = 0; i < personArray.length; i++) {
    // console.log(personArray[i]);
}

const numberArray = [23, 56 ,34, 556, 780, 55, 123]
for (let i = 0; i < numberArray.length; i++) {
    if (numberArray[i]%2==0) {
        // console.log(numberArray[i]+ " is an even number.");
    }
}

let max = numberArray[0]
for (let i = 0; i < numberArray.length; i++) {
    if (numberArray[i]>max) {
        max=numberArray[i]
    }
}
// console.log(max);

const user1 = {
    fname:'Aman',
    gender:'male'
}
// console.log(user1['gender']);


//Array of objects
const allUsers = [{
    fname: 'Aman',
    gender: 'male'
}, {
    fname:'raman',
    gender:'male',
    metadata: {
        age: 21,
        address: ''
    }
}, {
    fname:'priya',
    gender: 'female'
}]

for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i]['gender']=='male') {
        // console.log(allUsers[i]['fname']);
    }
    
}

const numArray = [22,33,44,55,66,77]
numArray.reverse()

// console.log(numArray);

//Functions
// function Sum(a,b) {
//     // do things with the input and return an output
//     return a+b
// }

// let sum=0;
// for (let i = 0; i < 100000000000000000; i++) {
//     sum=sum+i;
    
// }
// console.log(sum);

// function sum(num1, num2, fnToCall){
//     let result = num1+num2;
//     // return result;
//     fnToCall(result)
// }

// function displayResult(data) {
//     console.log("Result of the sum is : "+data);
// }

// function displayResultPassive(data) {
//     console.log("Sum's result is : "+data);
// }

// const ans = sum(1,2,displayResult);  //CALLBACKS

function calculateArithmetic(a,b, arithmeticFinalFunction){
    const ans = arithmeticFinalFunction(a,b);
    return ans;
}

function sum(a,b) {
    return a+b;
}
function sub (a,b) {
    return a-b;
}
const value = calculateArithmetic(1,2,sum)
// console.log(value);

//setTimeout
function greet(){
    console.log('Hello World');
}
function greetAlien(){
    console.log('Hello Alien');
}


setTimeout( greetAlien , 3 * 1000)

// setInterval(greetAlien , 1*1000)