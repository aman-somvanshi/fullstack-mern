import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient();

async function insertUser(username:string, password: string, firstName: string, lastName: string, email: string) {
    const response = await prisma.user.create({
        data: {
            username,
            password,
            firstName,
            lastName,
            email
        }
    })
    console.log(response);
}

// insertUser("aman_rookie", "aman123", "aman", "rookie" ,"aman@rookie.com");
// insertUser("rock_rookie", "rock123", "rock", "rookie" ,"rock@rookie.com");

async function createTodo(userId: number, title: string, description: string) {
    const response = await prisma.todos.create({
        data: {
            userId: userId,
            title: title,
            Description: description
        }
    })
    console.log(response);
}

// createTodo(1, "go to gym", "go to gym and do 10 pushups");

async function getTodos(userId: number) {
    const response = await prisma.todos.findMany({
        where: {
            userId: userId
        }
    })
    console.log(response);
}

// getTodos(1); 

async function getTodosAndUserDetails(userId: number) {
    const response = await prisma.todos.findMany({
        where: {
            userId: userId
        },
        select:{
            id: true,
            title: true,
            Description: true,
            user: true
        }
    })

    // const userDetails = await prisma.user.findUnique({
    //     where:{
    //         id: userId
    //     }
    // })
    console.log(response);
    // console.log(userDetails);
}



getTodosAndUserDetails(1);



