import { Hono } from 'hono'

const app = new Hono()

// Here c --> context


// app.get('/', (c) => {
//   // return c.text('Hello Hono!')
//   return c.json({
//     message: "Hello World!"
//   })
// })

async function authMiddleware(c: any, next: any){
  if(c.req.header("Authorization")) {
    // Do validation
    const initTime = new Date().getTime();
    await next();
    const totalTime = (new Date().getTime() - initTime) / 1000;
    console.log(`The request took ${totalTime} seconds`);
    // we have awaited the next function because only then would the code written below it will run.
  } else {
    return c.text("You don't have access");
  }
}

// app.use(authMiddleware);

app.post('/', authMiddleware, async (c) => {
  const body = await c.req.json();
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  return c.text('Hello Hono!')
})

// Here c gives you both the request parameter as well as the response parameter.
export default app
