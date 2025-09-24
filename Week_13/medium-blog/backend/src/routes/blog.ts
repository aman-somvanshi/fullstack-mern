import { Hono } from "hono";
import {verify } from 'hono/jwt'
import { JWTPayload } from "hono/utils/jwt/types";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@aman_somvanshi/medium-blog-common";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();



interface MyJWTPayload extends JWTPayload {
  id: string
}




// Write the middleware here
blogRouter.use('/*', async (c, next) => {
  // get the header
  // verify the header
  // if the header is correct, we can proceed
  // if not, we return the user a 403 status code
  const authHeader = c.req.header("Authorization") || "";
  // Bearer token ==> ["Bearer" , "token"]
  const token = authHeader.split(" ")[1];

  try {
    const response = await verify(token, c.env.JWT_SECRET) as MyJWTPayload;
    if(!response.id){
        c.status(403);
        return c.json({ error: "Unauthorized"})
    }
    c.set('userId', response.id);
    await next();
  } catch (e) {
    c.status(403);
    return c.json({ error: "Unauthorized"})
  }
})




blogRouter.post('/', async (c) => {

    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();

  const {success} = createBlogInput.safeParse(body);
  if(!success) {
    c.status(411);
    return c.json({
        message: "Inputs not correct !"
    })
  }

  const blog = await prisma.blog.create({
    data: {
        title: body.title,
        content: body.content,
        published: body.published,
        authorId: c.get("userId")// we will extract this from the middleware which will identify what user is accessing this endpoint
    }
  })
  return c.json({
    id: blog.id
  })
})



blogRouter.put('/', async (c) => {

    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();

  const {success} = updateBlogInput.safeParse(body);
  if(!success) {
    c.status(411);
    return c.json({
        message: "Inputs not correct !"
    })
  }

  const updatedBlog = await prisma.blog.update({
    where: {
        id: body.id
    },
    data:{
        title: body.title,
        content: body.content,
        published: body.published,
    }
  })


  return c.json({
    id: updatedBlog.id
  })

})

// Ideally, Pagination should be added here. So you return only 10 blogs first , and then if the user asks for more then only return more of them.
// Todo: add pagination
blogRouter.get('/bulk', async (c) => {

    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.blog.findMany(); // we gave no condition for findMany so that it returns all the blogs for the users

  return c.json({
    blogs
  })
})


blogRouter.get('/:id', async (c) => {

    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogId = c.req.param('id');

  try {
        const blog = await prisma.blog.findFirst({
        where:{
            id: blogId
        }
    })

    return c.json({
        blog
    })
  } catch (e) {
    c.status(411);
    return c.json({
        message: "Error while fetching the blog post"
    })
  }
})


