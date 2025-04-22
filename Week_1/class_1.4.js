//Callback functions --> functions that are passed as arguments to other functions
function square(n){
    return n * n;
}
function cube(n){
    return n*n*n;
}

function sumOfSomething(a, b, callback){
    const val1 = callback(a);
    const val2 = callback(b);
    return val1 + val2;
}

console.log(sumOfSomething(2,3, cube))

//Anonymous functions --> functions do not have a name
//They don't have a name since they cannot be called outside of their scope
//Anonymous functions are functions that are dynamically declared at runtime
console.log(sumOfSomething(1,2, function(n){
    return n*n*n;
}))
