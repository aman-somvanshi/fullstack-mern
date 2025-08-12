"use strict";
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
};
obj.name = "Severus"; // Notice how even when obj is a constant , a value inside it can be changed. However, the following action cannot be performed - 
// obj = {
//     name: "Severus",
//     age: 40
// }
// Same goes for array - 
const a = [1, 2, 3, 4];
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
const users = new Map();
users.set("ras@qd1", { name: "aman", age: 30 });
users.set("sarah@qd1", { name: "sarah", age: 18 });
const user = users.get("ras@qd1");
console.log(user);
