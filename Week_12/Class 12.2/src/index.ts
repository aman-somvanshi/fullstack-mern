// Revise the following stuff before proceeding

// interface User {
//     name: string,
//     age: number
// }

// function sumOfAge(user1: User, user2: User): number {
//     return user1.age+ user2.age;
// }

// const age = sumOfAge(
//     {
//         name: 'Taro',
//         age: 18
//     }, {
//         name: 'Ravi Kishan',
//         age: 45
//     }
// );

// console.log(age);




// Pick


// interface User {
//     id: string,
//     name: string,
//     age: number,
//     email: string,
//     password: string
// }

// Suppose we want to update only certain parameters of the User object

// interface UpdateProps {
//     name: string,
//     age: number,
//     password: string
// } 

// function updateUser(updatedProps: UpdateProps) {
//     // hit the database to update the user
// } 

// Problem with creating another interface is that if we change the type of a variable in the initial source , then we need to do the same in the other interfaces too which we might miss.


// Hence, we use pick.

// interface User {
//     id: string,
//     name: string,
//     age: number,
//     email: string,
//     password: string
// }

// type UpdateProps = Pick<User, 'name' | 'age' | 'email' >

// function updateUser(updatedProps: UpdateProps) {
//     // hit the database to update the user
// } 






// Partial

// Currently, updateUser function accepts UpdateProps as a type. But it expects all 3 of the parameters - name, age, email  to be present.
// But, a user in the real world might not be updating all 3. They might just be updating one of them.

// Again, the most basic way to do this will be -

// interface User {
//     id: string,
//     name: string,
//     age: number,
//     email: string,
//     password: string
// }

// interface UpdateProps {
//     name?: string,
//     age?: number,
//     email?: string
// }

// But this will again cause the same problems we faced before using Pick.

// So, the best way to proceed is to first pick the values that you need and then using Partial.

// interface User {
//     id: string,
//     name: string,
//     age: number,
//     email: string,
//     password: string
// }

// type UpdateProps = Pick<User, 'name' | 'age' | 'email' >;

// type UpdatePropsOptional = Partial<UpdateProps>;

// // So now the function becomes -

// function updateUser(updatedProps: UpdatePropsOptional) {
//     // hit the database to update the user
// }

// updateUser({
//     name: 'John'
// })

















// Readonly

const obj = {
    name: 'Aman',
    age: 18
}

obj.name = "Severus"; // Notice how even when obj is a constant , a value inside it can be changed. However, the following action cannot be performed - 
// obj = {
//     name: "Severus",
//     age: 40
// }

// Same goes for array - 

const a = [1,2,3,4]
a[0] = 5; // Typescript allows this
// a = [2,3,4,5]; // Typescript doesn't allow this


// type User = {
//     readonly name: string,
//     readonly age: number
// }

// const user: User = {
//     name: 'Aman',
//     age: 22
// }

// user.age = 18; // Typescript doesn't allow us to update values inside object now.
// Error - Cannot assign to 'age' because it is a read-only property


// Another way to achieve the same effect as above without writing readonly multiple times

// type User = {
//     name: string,
//     age: number
// }

// const user: Readonly<User> = {
//     name: 'John',
//     age: 34
// }

// user.age = 13














// Record and Map

 
// type User = {
//     id : string,
//     username: string
// }    

// type Users = {
//     [key: string] : User
// }

// const users : Users = {
//     "ras@qd1" : {
//         id: "ras@qd1",
//         username: "aman"
//     },
//     "ras1dr@" : {
//         id: "ras1dr@",
//         username: "ravi"
//     } 
// }



// As you can see, the above code is quite ugly.
// Record lets you give a cleaner type to objects.

// type User = {
//     id : string,
//     username: string
// }    

// type Users = Record<string, User>

// const users : Users = {
//     "ras@qd1" : {
//         id: "ras@qd1",
//         username: "aman"
//     },
//     "ras1dr@" : {
//         id: "ras1dr@",
//         username: "ravi"
//     } 
// }



// Maps

type User = {
    name: string,
    age: number
}

const users = new Map<string, User>()
users.set("ras@qd1", {name: "aman", age: 30})
users.set("sarah@qd1", {name: "sarah", age: 18})

const user = users.get("ras@qd1");
console.log(user);















// Exclude

type EventType = 'click' | 'scroll' | 'mousemove';
// Using Exclude to create a new type without 'scroll'
type ExcludeEvent = Exclude<EventType, 'scroll'>; // 'click' | 'mousemove'

// Function that accepts only 'click' and 'mousemove' events
const handleEvent = (event: ExcludeEvent) => {
  console.log(`Handling event: ${event}`);
};

handleEvent('click'); // OK
// handleEvent('scroll'); // Error: Argument of type '"scroll"' is not assignable to parameter of type 'ExcludeEvent'.








// Type inference in Zod

import { z } from 'zod';
import express from "express";

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Define the schema for profile update
const userProfileSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  email: z.email({ message: "Invalid email format" }),
  age: z.number().min(18, { message: "You must be at least 18 years old" }).optional(),
}); // This is a runtime variable

// Our goal is to create a compile time variable through which typescript can validate the type at compile time while also ensuring that we don't have to write the same code twice.

app.put("/user", (req, res) => {
  const result = userProfileSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ error: result.error });
    return;
  }

  // Type of updateBody is inferred from userProfileSchema
  const updateBody = result.data;

  // update database here
  res.json({
    message: "User updated",
    updateBody
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));


// Assigning a Type to `updateBody`

// Thanks to Zod's type inference, the type of `updateBody` is automatically inferred to be:

// {
//   name: string;
//   email: string;
//   age?: number;
// }



