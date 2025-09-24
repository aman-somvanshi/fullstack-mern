// This file contains both - Class 13.1 and Class 13.3 . 13.2 was an AMA.
// This file is about building the backend of our medium blog application. 

// Step 1 - The Stack


// We’ll be building medium in the following stack
// 1. React in the frontend
// 2. Cloudflare workers in the backend
// 3. zod as the validation library, type inference for the frontend types
// 4. Typescript as the language
// 5. Prisma as the ORM, with connection pooling
// 6. Postgres as the database
// 7. jwt for authentication










// Step 2 - Initalize the backend

// Whenever you’re building a project, usually the first thing you should do is initialise the project’s backend.
// Create a new folder called medium
// mkdir medium-blog
// cd medium-blog

// Initialize a hono based cloudflare worker app 
// npm create hono@latest

// Target directory › backend
// Which template do you want to use? - cloudflare-workers
// Do you want to install project dependencies? … yes
// Which package manager do you want to use? › npm (or yarn or bun, doesnt matter)
// 💡
// Reference https://hono.dev/top
 

// Why did we choose hono?

// We are using hono instead of express since express doesn't work on Cloudflare workers. And hono is an http framework that works easily in multiple environments like workers, nodejs, Bun, etc.












// Step 3 - Initialize handlers

// To begin with, our backend will have 4 routes
// 1. POST /api/v1/user/signup
// 2. POST /api/v1/user/signin
// 3. POST /api/v1/blog
// 4. PUT /api/v1/blog
// 5. GET /api/v1/blog/:id
// 6. GET /api/v1/blog/bulk
// 💡
// https://hono.dev/api/routing



// Note - In Hono (the lightweight web framework for JavaScript/TypeScript),
// 👉 Context (c) is an object that represents everything about the current HTTP request and response. It’s passed into every route handler










// Step 4 - Initialize DB (prisma)
// 1. Get your connection url from neon.db or aieven.tech
// postgres://avnadmin:password@host/db

// 2. Get connection pool URL from Prisma accelerate
// https://www.prisma.io/data-platform/accelerate
// prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNTM2M2U5ZjEtNmNjMS00MWNkLWJiZTctN2U4NzFmMGFhZjJmIiwidGVuYW50X2lkIjoiY2I5OTE2NDk0MzFkNWZmZWRmNmFiYzViMGFlOTIwYzFhZDRjMGY5MTg1ZjZiNDY0OTc3MzgyN2IyMzY2OWIwMiIsImludGVybmFsX3NlY3JldCI6Ijc0NjE4YWY2LTA4NmItNDM0OC04MzIxLWMyMmY2NDEwOTExNyJ9.HXnE3vZjf8YH71uOollsvrV-TSe41770FPG_O8IaVgs

// 3. Initialize prisma in your project
// Make sure you are in the backend folder
// npm i prisma
// npx prisma init

 
// Replace DATABASE_URL in .env
// DATABASE_URL="postgres://avnadmin:password@host/db"

// Add DATABASE_URL as the connection pool url in wrangler.toml
// name = "backend"
// compatibility_date = "2023-12-01"

// [vars]
// DATABASE_URL = "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNTM2M2U5ZjEtNmNjMS00MWNkLWJiZTctN2U4NzFmMGFhZjJmIiwidGVuYW50X2lkIjoiY2I5OTE2NDk0MzFkNWZmZWRmNmFiYzViMGFlOTIwYzFhZDRjMGY5MTg1ZjZiNDY0OTc3MzgyN2IyMzY2OWIwMiIsImludGVybmFsX3NlY3JldCI6Ijc0NjE4YWY2LTA4NmItNDM0OC04MzIxLWMyMmY2NDEwOTExNyJ9.HXnE3vZjf8YH71uOollsvrV-TSe41770FPG_O8IaVgs"

// Don't forget that your prsima CLI pickes up the environment variables from the .env file and your application(index.ts) picks that up from wranfgler.jsonc.

// If you are using a Node.js based edge environment, then the pooled connection will work fine with neon.db pool url.
// If you are using a different js runtime (such as AWS Lambda or Cloudflare Workers) is when the neon.tech pooled connection might not work.

// The pooled connection that you get from neon.db does not have a bunch of prisma dependencies that the prisma pooled connnection gives.

// You should not have your prod URL committed either in .env or in wrangler.toml to github
// wranger.toml should have a dev/local DB url
// .env should be in .gitignore
// 4. Initialize the schema
// generator client {
//   provider = "prisma-client-js"
// }

// datasource db {
//   provider = "postgresql"
//   url      = env("DATABASE_URL")
// }

// model User {
//   id       String   @id @default(uuid())
//   email    String   @unique
//   name     String?
//   password String
//   posts    Post[]
// }


// Note - UUID (Universally Unique Identifier) is a 128-bit value (usually shown as a 36-character string like 550e8400-e29b-41d4-a716-446655440000).
// 👉 Purpose:
// 1. Provides a unique ID across systems, databases, and time.
// 2. Prevents collisions (two records having the same ID).



// model Post {
//   id        String   @id @default(uuid())
//   title     String
//   content   String
//   published Boolean  @default(false)
//   author    User     @relation(fields: [authorId], references: [id])
//   authorId  String
// }

// 5. Migrate your database
// npx prisma migrate dev --name init_schema

// If in case, the migration command doesn't work, you should push your code onto an aws machine and then run the command there. Once migration folder is created, you push the entire codebase onto github and then pull it to your local machine.

// 💡
// You might face issues here, try changing your wifi if that happens
// 6. Generate the prisma client 
// npx prisma generate --no-engine

// 7. Add the accelerate extension
// npm install @prisma/extension-accelerate

// 8. Initialize the prisma client
// import { PrismaClient } from '@prisma/client/edge'
// import { withAccelerate } from '@prisma/extension-accelerate'

// const prisma = new PrismaClient({
//     datasourceUrl: env.DATABASE_URL,
// }).$extends(withAccelerate())


// You should avoid using global variables as much as possible. 

// Whenever you are initalizing hono, you have to pass the environment variable as a generic (<>) so that Typescript knows that the environment variable has a type.













// Step 5 - Create non auth routes

// 1. Simple Signup route
// Add the logic to insert data to the DB, and if an error is thrown, tell the user about it
// 💡
// To get the right types on c.env, when initializing the Hono app, pass the types of env as a generic
// const app = new Hono<{
// 	Bindings: {
// 		DATABASE_URL: string
// 	}
// }>();

// Note - You can also bypass the above typescript error by writing -  //@ts-ignore
// Writing the above statement ignores any typescript error in the line written just below it.

// 💡
// Ideally you shouldn’t store passwords in plaintext. You should hash before storing them. More details on how you can do that - 
// https://community.cloudflare.com/t/options-for-password-hashing/138077
// https://developers.cloudflare.com/workers/runtime-apis/web-crypto/
// 2. Add JWT to signup route
// Also add the logic to return the user a jwt when their user id encoded. 
// This would also involve adding a new env variable JWT_SECRET to wrangler.jsonc
// 💡
// Use jwt provided by hono - https://hono.dev/helpers/jwt
// Solution
// 3. Add a signin route



// Q- What is the .env file?
// Ans - The .env file is a simple text file where you store environment variables (settings or secrets) for your project.
// 👉 Purpose:
// Keeps sensitive info (like database passwords, API keys, tokens) out of your main code.


// However, Cloudflare workers pickes environment variables from wrangler.jsonc

// ❌ You cannot put environment variables as global variables outside the route
// In Workers, env vars (c.env) are injected per request.
// The Context (c) object only exists inside a route or middleware.











// Step 6 - Middlewares

// Creating a middleware in hono is well documented - https://hono.dev/guides/middleware
// 1. Limiting the middleware
// To restrict a middleware to certain routes, you can use the following - 
// app.use('/message/*', async (c, next) => {
//   await next()
// })

 
// In our case, the following routes need to be protected - 

// app.get('/api/v1/blog/:id', (c) => {})

// app.post('/api/v1/blog', (c) => {})

// app.put('/api/v1/blog', (c) => {})

// So we can add a top level middleware
// app.use('/api/v1/blog/*', async (c, next) => {
//   await next()
// })

// 2. Writing the middleware
// Write the logic that extracts the user id and passes it over to the main route.
// How to pass data from middleware to the route handler?
// How to make sure the types of variables that are being passed is correct?
// Solution
// 3. Confirm that the user is able to access authenticated routes
// app.post('/api/v1/blog', (c) => {
// 	console.log(c.get('userId'));
// 	return c.text('signin route')
// })

// Send the Header from Postman and ensure that the user id gets logged on the server
// Callout
// 💡
// If you want, you can extract the prisma variable in a global middleware that set’s it on the context variable
// app.use(”*”, (c) => {
// 	const prisma = new PrismaClient({
//       datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());
//   c.set(”prisma”, prisma);
// })

// Ref https://stackoverflow.com/questions/75554786/use-cloudflare-worker-env-outside-fetch-scope










// Step - 7 

// Better routing
// https://hono.dev/api/routing#grouping
// Hono let’s you group routes together so you can have a cleaner file structure.
// Create two new files - 
// routes/user.ts
// routes/blog.ts
// and push the user routes to user.ts
// index.ts
// user.ts
// Blog routes
// 1. Create the route to initialize a blog/post
// Solution
// 2. Create the route to update blog
// Solution
// 3. Create the route to get all blogs
// Solution 
// 4. Create the route to get a blog
// Solution

// Ideally, Pagination should be added for the 4th end point. So you return only 10 blogs first , and then if the user asks for more then only return more of them.
 
// Try to hit the routes via POSTMAN and ensure they work as expected


// Q- Why the order in which these endpoints are written is imp here?

// Note - Routers usually match endpoints in the order you define them.
// /:id is a catch-all route — it will match any string after /blogs/.
// If it comes before /bulk, then:
// /blogs/bulk will be treated as id = "bulk"
// The server will never reach the /bulk route.


// 🔑 Rule of Thumb
// Always put more specific routes before dynamic ones.
// /bulk is specific → goes first.
// /:id is dynamic → goes after.








// Step 8 - Understanding the types
// Bindings
// https://hono.dev/getting-started/cloudflare-workers#bindings
// See Bindings.webp

// In our case, we need 2 env variables - 
// JWT_SECRET
// DATABASE_URL
 
// Variables
// https://hono.dev/api/context#var
// If you wan’t to get and set values on the context of the request, you can use c.get and c.set
// You need to make typescript aware of the variables that you will be setting on the context.
// You can also create a middleware that sets prisma in the context so you don’t need to initialise it in the function body again and again







// Step 9 - Deploy your app

// npx wrangler login
// npx wrangler whoami
// npm run deploy

// Update the env variables from cloudflare dashboard
// Test your production URL in postman, make sure it works
















// Step 10 - Zod validation
// If you’ve gone through the video Cohort 1 - Deploying npm packages, Intro to Monorepos, you’ll notice we introduced type inference in Zod 
// https://zod.dev/?id=type-inference
 
// This let’s you get types from runtime zod variables that you can use on your frontend
 
// Refer to the image - modules.webp and to the file - zod.ts
 
// We will divide our project into 3 parts
// Backend
// Frontend
// common
// common will contain all the things that frontend and backend want to share. 
// We will make common an independent npm module for now. 
// Eventually, we will see how monorepos make it easier to have multiple packages sharing code in the same repo


// So now we create a common folder
// npm init -y
// npx tsc --init

// Change rootDir to src and outDir to dist. Also uncomment declaration: true ---> This generates .d.ts files which allow you to ship type definitions too.

// Now create all the zod validation and their respective type definitions that will be used in the frontend. Put all types in `src/index.ts`
    // 1. signupInput / SignupInput
    // 2. signinInput / SigninInput
    // 3. createPostInput / CreatePostInput
    // 4. updatePostInput / UpdatePostInput

// Update the name in package.json to be in your own npm namespace, Update main to be dist/index.js

// Add src to .npmignore

// Install zod
// npm i zod

// 1. `tsc -b` to generate the output

// 1. Sign up/login to npmjs.org
// 2. Run `npm login`

// 3. Publish to npm

// npm publish --access public

// Explore your package on npmjs


// We did all this because eventually we are going to have a frontend folder which won't be able to access the zod types from backend folder. So we placed all that code into the common folder. And deployed it as an npm package. So now both backend and frontend folder can access zod types by installing that npm package.

// npm version patch ---> this command is used to update code in an npm package by increasing its version

// Run npm publish --access public






// What is Promise.all?
// Promise.all lets you run many promises at the same time and wait until all of them are finished.
// Think of it like: “I’ll order 3 food items together, and I’ll only start eating when all 3 arrive.” 

// Important Points
// 1. Parallel execution → faster than waiting one by one.

// 2. Order preserved → results come back as [result1, result2, result3].

// 3. Error behavior → if any promise fails ❌, the whole Promise.all fails.





// Note - Databases can handle a limited number of concurrent connections. Each connection requires RAM, which means that simply increasing the database connection limit without scaling available resources:

// ✔ might allow more processes to connect but
// ✘ significantly affects database performance, and can result in the database being shut down due to an out of memory error
