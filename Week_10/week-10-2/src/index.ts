import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

// Above two lines are similar to
// import mongoose from "mongoose"
// mongoose.connect()

async function insertUser(email: string, password: string, firstName: string, lastName: string) {
  const res = await prisma.users.create({
    data:{
        email,
        password,
        firstName,
        lastName
    },
    select: {
        id: true,
        password: true
    }
  })
  console.log(res);
}


// insertUser("user@gmail.com", "user123", "user" , "singh");
// insertUser("user2@gmail.com", "user123", "user" , "singh");
// insertUser("user4@gmail.com", "user123", "user" , "singh");

interface UpdateParams {
    firstName: string;
    lastName: string;
}

async function updateUser(username: string, {
    firstName,
    lastName
}: UpdateParams) {
  const res = await prisma.users.update({
    where: {
        email: username
    },
    data: {
        firstName,
        lastName
    }

  })
  console.log(res);
}

// updateUser("user@gmail.com", {
//     firstName: "MS",
//     lastName: "Dhoni"
// })

async function getUser(username: string) {
  const res =  await prisma.users.findFirst({
    where: {
        email: username
    }
  })
  console.log(res);
}

getUser("user@gmail.com")