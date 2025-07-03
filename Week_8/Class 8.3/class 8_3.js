// axios vs fetch

// these are two popular ways to hit the backend server and get back response from them

// axios provides cleaner syntax than fetch

// fetch is a native function in JavaScript whereas axios is a third party library

// https://api.sampleapis.com/playstation/games




// Example for fetch API ---

// GET request ->

// async function main(){
//     const response = await fetch("https://api.sampleapis.com/playstation/games");
//     const jsonResponse = await response.json();
//     console.log(jsonResponse.length);
// }


// POST request ->

// async function main(){
//     const response = await fetch("https://reqres.in/api/users", {
//         method: "POST",
//         headers: {
//             "Content-Type" : "application/json",
//             "x-api-key": "reqres-free-v1" // had to obtain it to test the api
//         },
//         body: JSON.stringify({
//             name: "Aman",
//             "job": "Developer"
//         })
//     });
//     const jsonResponse = await response.json();
//     console.log(jsonResponse);

//     // Output => { id: '256', createdAt: '2025-07-03T13:37:30.594Z' }
// }

// main();





// Example for axios ---
const axios = require("axios");


// GET request ->

// async function main() {
//     const response = await axios.get("https://api.sampleapis.com/playstation/games");
//     const finalResponse = response.data;
//     console.log(finalResponse.length);
// }



// POST request -> 
// async function main() {
//     const response = await axios.post("https://reqres.in/api/users", {
//         name: "Aman",
//         job: "Developer"
//     }, {
//        headers: {
//         "x-api-key": "reqres-free-v1" 
//        } 
//     });
//     const finalResponse = response.data;
//     console.log(finalResponse);

//     // Output --> {
//     //   name: 'Aman',
//     //   job: 'Developer',
//     //   id: '264',
//     //   createdAt: '2025-07-03T13:43:33.430Z'
//     // }
// }


// Another syntax for axios request is ->

async function main() {
    const response = await axios({
        url: "https://httpdump.app/dumps/4b30597f-72b7-4739-9331-271972cede67",
        method: "PUT",
        headers: {
            "x-api-key": "reqres-free-v1" // Not necessary to give api key unless api asks for it
        },
        data: {
            name: "Ramesh",
            job: "Developer"
        }
    });
    console.log(response.data);
}
main();


// In fetch you had to make two API calls to get the data in JSON format whereas in axios you just have to make one API call and it automatically converts the response into JSON format.

// body is sent as the second argument in case of axios. And headers can be sent as the third argument.

// you cannot send a requets body in a GET request. you can do that only in a POST request.
// In a GET request, secomd argument can contain headers.

// https://httpdump.app/dumps/4b30597f-72b7-4739-9331-271972cede67 --> This is the http dump which provides you a endpoint onto which you can send and view everything about your http request

