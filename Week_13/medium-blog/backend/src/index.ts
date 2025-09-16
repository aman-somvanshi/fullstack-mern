import { Hono } from 'hono'
import { PrismaClient } from "./generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {sign, verify, decode } from 'hono/jwt'

const app = new Hono<{
   Bindings: { 
    DATABASE_URL: string,
    JWT_SECRET: string
  } 
}>().basePath('/api/v1');

app.post('/signup', async (c) => {

  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password
    }
  })
  
  const token = await sign ({id: user.id}, c.env.JWT_SECRET);

  return c.json({token})
})
app.post('/signin', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const user = await prisma.user.findUnique({
    where:{
      email: body.email,
      password: body.password
    }
  })

  if(!user){
    c.status(403);
    return c.text('Wrong email or password')
  }

  const token = await sign({id: user.id}, c.env.JWT_SECRET);
  
  return c.json({token});
})

app.use('/blog/*', async (c, next) => {
  // get the header
  // verify the header
  // if the header is correct, we can proceed
  // if not, we return the user a 403 status code
  const header = c.req.header("Authorization") || "";
  // Bearer token ==> ["Bearer" , "token"]
  const token = header.split(" ")[1];

  const response = await verify(token, c.env.JWT_SECRET)
  if(!response.id){
    c.status(403);
    return c.json({ error: "Unauthorized"})
  }
  // c.set('userId', response.id);
  await next();
})
app.post('/blog', (c) => {
  return c.text('Hello Hono!')
})
app.put('/blog', (c) => {
  return c.text('Hello Hono!')
})
app.get('/blog/:id', (c) => {
  return c.text('Hello Hono!')
})
app.get('/blog/bulk', (c) => {
  return c.text('Hello Hono!')
})

export default app
