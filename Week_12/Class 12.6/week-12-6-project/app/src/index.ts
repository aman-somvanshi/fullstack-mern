/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Hono, Next } from 'hono'
import { PrismaClient } from './generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono<{ Bindings: { DATABASE_URL: string } }>()

app.get("/", async (c) => {
	return c.json({msg: "You did it !"})
})

app.post('/', async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
    },
  })
  return c.json({ msg: 'User created' })
})

export default app