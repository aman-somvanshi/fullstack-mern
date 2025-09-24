import { Hono } from "hono";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {sign} from 'hono/jwt'
import { signinInput, signupInput } from "@aman_somvanshi/medium-blog-common";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

userRouter.post('/signup', async (c) => {

  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  // add password hashing

  const {success} = signupInput.safeParse(body);
  if(!success) {
    c.status(411);
    return c.json({
        message: "Inputs not correct !"
    })
  }
  // We are putting the following code in a try catch block because it might give error when we are entering an email already existing in the database.
  try {
      const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name
      }
    })
    const token = await sign ({id: user.id}, c.env.JWT_SECRET);

    return c.json({token})
  } catch (e) {
    c.status(411);
    return c.text("Something went wrong !")
  }
  
  
})
userRouter.post('/signin', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const {success} = signinInput.safeParse(body);
  if(!success) {
    c.status(411);
    return c.json({
        message: "Inputs not correct !"
    })
  }

  try {
      const user = await prisma.user.findFirst({
      where:{
        email: body.email,
        password: body.password
      }
    })

    if(!user){
      c.status(403);
      return c.text('Incorrect credentials')
    }

    const token = await sign({id: user.id}, c.env.JWT_SECRET);
    
    return c.json({token});
  } catch (e) {
    c.status(411);
    return c.text('Something went wrong !')
  }
})