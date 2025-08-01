// What are backend servers?

// You might’ve used express to create a Backend server.
// The way to run it usually is node index.js which starts a process on a certain port (3000 for example)
// When you have to deploy it on the internet, there are a few ways - 
// 1. Go to aws, GCP, Azure, Cloudflare
// 2. Rent a VM (Virtual Machine) and deploy your app
// 3. Put it in an Auto scaling group
// 4. Deploy it in a Kubernetes cluster
 
// There are a few downsides to doing this - 
// 1. Taking care of how/when to scale 
// 2. Base cost even if no one is visiting your website
// 3. Monitoring various servers to make sure no server is down
 
// What if, you could just write the code and someone else could take care of all of these problems?

// This is where serverless backends come into the picture.










// What are serverless backends?

// "Serverless" is a backend deployment in which the cloud provider dynamically manages the allocation and provisioning of servers. The term "serverless" doesn't mean there are no servers involved. Instead, it means that developers and operators do not have to worry about the servers.
 
// Easier definition
// What if you could just write your express routes and run a simple command. The app would automatically 
// 1. Deploy
// 2. Autoscale
// 3. Charge you on a per request basis (rather than you paying for VMs)
 
// Problems with this approach
// 1. More expensive at scale
// 2. Cold start problem


// Cold start problem - If noone has visited our application for a rally long time, the cloud providers will have shut down our server to save resources. So when a new request comes, it takes time to set up the environment and run our code again. This setup takes extra time and that is called a cold start.

// Solution for the cold start problem -
// 1. Keep pinging the server at regular intervals to avoid it from getting idle.
// 2. Maintain a warm pool - a set of pre-initialized serverless function instances that are kept ready to handle incoming requests instantly — without cold starts.








// Famous serverless providers
// There are many famous backend serverless providers - 

// AWS Lambda
// https://aws.amazon.com/pm/lambda/?trk=5cc83e4b-8a6e-4976-92ff-7a6198f2fe76&sc_channel=ps&ef_id=CjwKCAiAt5euBhB9EiwAdkXWO-i-th4J3onX9ji-tPt_JmsBAQJLWYN4hzTF0Zxb084EkUBxSCK5vhoC-1wQAvD_BwE:G:s&s_kwcid=AL!4422!3!651612776783!e!!g!!aws lambda!19828229697!143940519541

// Google Cloud Functions
// https://firebase.google.com/docs/functions

// Cloudflare Workers
// https://workers.cloudflare.com/








// When should you use a serverless architecture?

// 1. When you have to get off the ground fast and don’t want to worry about deployments
// 2. When you can’t anticipate the traffic and don’t want to worry about autoscaling
// 3. If you have very low traffic and want to optimise for costs

// So until you have a small application that receives a small number of requests only, you should stay with serverless backends. But if the requests scale up (like that in Facebook), you should move your server to a VM architecture.









// Cloudflare Workers Setup 

// We’ll be understanding cloudflare workers today. 
// Reason - No credit card required to deploy one

// Please sign up on https://cloudflare.com/

// Try creating a test worker from the UI (Common worker examples) and try hitting the URL at which it is deployed

// Cloudflare Workers is a serverless computing platform that lets you run small pieces of code (usually written in JavaScript) directly on Cloudflare's global network of servers, called the "edge," which are located all over the world. This means that instead of your code running on a single centralized server, it runs closer to the users who are making requests to a website. This proximity reduces delay (latency) and speeds up response times.

// Cloudflare has developed its own Workers runtime which is very similar to node.js runtime. The differences between JavaScript written for the browser or Node.js happen at runtime. 

// Refer to the image if you want - How cloudflare workers work.webp

// Similar to Cloudflare workers, there are also Google Cloud Functions and AWS Lambda.




// Isolates

// Cloudflare uses the V8 engine (the same JavaScript engine used in Chrome).
// Instead of creating a heavy virtual machine or container for each request, V8 quickly spins up an isolate inside a shared environment.
// Each isolate has its own memory, variables, and scope — like a self-contained bubble.

// Refer to the image to see the diagram - isolates.webp
 



















// Initializing the worker

// To create and deploy your application, you can take the following steps - 
// Initialize a worker
// npm create cloudflare -- my-app

// Select no for Do you want to deploy your application
 
// Explore package.json dependencies
// "wrangler": "^3.0.0"

// Notice express is not a dependency there
// Start the worker locally
// npm run dev

// How to return json?
// export default {
// 	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
// 		return Response.json({
// 			message: "hi"
// 		});
// 	},
// };



// Question - Where is the express code? HTTP Server?
// Cloudflare expects you to just write the logic to handle a request. 
// Creating an HTTP server on top is handled by cloudflare and in this case wrangler is doing this.
// Wrangler is the CLI tool that helps you develop and deploy Cloudflare Workers applications.

// Question - How can I do routing ? 
// In express, routing is done as follows - 

// import express from "express"
// const app = express();

// app.get("/route", (req, res) => {
// 	// handles a get request to /route
// });


// How can you do the same in the Cloudflare environment?

// Refer to index.ts of my-app/src folder.

// Cloudflare does not expect a routing library/http server out of the box. You can write a full application with just the constructs available (as shown in the index.ts file).
 
// We will eventually see how you can use other HTTP frameworks (like express) in cloudflare workers.


















// Deploying a worker

// Now that you have written a basic HTTP server, let’s get to the most interesting bit — Deploying it on the internet

// We use wrangler for this 

// Step 1 - Login to cloudflare via the wrangler cli
// npx wrangler login

// Step 2 - Deploy your worker
// npm run deploy

// If all goes well, you should see the app up and running




// npx wrangler whoami --> gives you the details of your cloudflare account




// export default {
// 	async fetch(request, env, ctx): Promise<Response> {
// 		return  Response.json({
// 			message: 'Hello World!'
// 		});
// 	},
// } satisfies ExportedHandler<Env>;

// This returns a promise of response object because first of all it's an async function, so it should return a promise and secondly, it is indeed returning a response object. So we used it's generic.






// Assigning a custom domain
// You have to buy a plan to be able to do this
// You also need to buy the domain on cloudflare/transfer the domain to cloudflare




// Adding express to it

// Why can’t we use express? Why does it cloudflare doesn’t start off with a simple express boiler plate?

// Reason 1 - Express heavily relies on Node.js whereas cloudflare doesn't support a lot of Node.js features
// https://community.cloudflare.com/t/express-support-for-workers/390844
// Refer to the image - options instead of express.webp to understand this better.


// You can split all your handlers in a file
// Create a generic handler that you can forward requests to from either express or hono or native cloudflare handler
// Refer to the image - understanding replacements for express.webp
// Refer to the image - managing express logic.webp
















// Since express doesn't work on Cloudflare workers, hence some other libraries were introduced.

// Hono
// https://hono.dev/concepts/motivation
// Initial motivation was to build a good framework for cloudflare workers. Eventually, it now supports a bunch of other runtimes.(e.g., Bun and AWS Lambda)
// Hono is a tiny, super-fast web framework for building APIs and web servers in JavaScript or TypeScript — especially for edge platforms like Cloudflare Workers, Vercel Edge Functions, Deno, Bun, and Node.js.




// So with hono we intend to able to do quite a few things - 
// body, headers, query parameters, middlewares, connecting to a database
// If we know this much in the case of hono, then we don't need express.

// Working with cloudflare workers - 
 
// 1. Initialize a new app
// npm create hono@latest hono-app

// Refer to index.ts in hono-app/src

// 2. Move to my-app and install the dependencies.
// cd hono-app
// npm i

 
// 3. Hello World
// import { Hono } from 'hono'
// const app = new Hono()

// app.get('/', (c) => c.text('Hello Cloudflare Workers!'))

// export default app

 
// Here c --> context






// Getting inputs from user
// import { Hono } from 'hono'

// const app = new Hono()

// app.get('/', async (c) => {
//   const body = await c.req.json()
//   console.log(body);
//   console.log(c.req.header("Authorization"));
//   console.log(c.req.query("param"));

//   return c.text('Hello Hono!')
// })

// export default app






// Deploying 
// Make sure you’re logged into cloudflare (wrangler login)
// npm run deploy





// Where is the indexx.js file to which the index.ts file is compiled down to?

// The most common convention (when not using custom configuration) is that the compiled JavaScript will temporarily exist in a directory like .wrangler or dist during the build process, but it is not usually retained after deployment unless you specify an output directory.
// but if you do "npm run dev", yoiu will see the compiled index.js file in the .wrangler/tmp directory.