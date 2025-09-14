// Connection Pooling in Serverless Environment

// Serverless environments have one big problem when dealing with databases. 

// 1. There can be many connections open to the DB since there can be multiple workers open in various regions. This can quickly exhaust the database's connection limit and degrade performance.
// Refer to Workers_connecting_to_DB.webp --> Every worker establishing its own connection to the databse server might lead to the server potentially exceed its connection limit.

// 2. Prisma the library has dependencies that the cloudflare runtime doesn’t understand. (similar to express)


// Connection Pooling

// The connection pool acts as an intermediary between database server and cloudflare workers.

// Refer to Connection_Pooling_Architecture.png

// The connection pool maintains a set of open connections to the database. Instead of each worker opening its own connection, they request a connection from the pool.


// Now, let's setup a prisma project that connects to clooudflare workers. Refer to week-12-6-project/app from now on.
// Follow these commands -

// 1. npm create cloudflare@latest
// 2. npm install --save-dev prisma
// 3. npx prisma init

// 4. Get a neon.tech databse url. (just for connection pooling purpose)

// Why didn't we use Docker postgres container here?
// Workers cannot maintain TCP connections to your local Postgres (even if Docker exposes it) because Workers only allow HTTP(S).

// 5. Put the databse url in the .env file and edit the schema.prisma file for creating your tables

// 6. npx prisma migrate dev --name init

// 7. Signup to Prisma accelerate
// https://console.prisma.io/login

// 8. Create a project on that. Navigate to that project and enable accelerate by using the connection string of neon.tech.

// 9. Generate an Accelerate connection string(or API key) and copy it.
// Create this connection pool in the same region where your database is present.

// 10. Replace it in .env with DATABASE_URL.

// Note we are trying to inject environment variables in the project using .env file. In cloudlflare workers app, a way to inject environment variables in the project is by using wrangler.toml file / wrangler.jsonc file. In that we introduce our DATABASE_URL environment variable.

// 11. Also, put the neon.tech connection string under the DIRECT_URL environment variable. This is because -
// If you use a pooler url in the url argument in schema.prisma, then prisma cli commands that require a direct connection (such as migration command) to the databse use the URL in the directurl argument.



// Note - All the environment variables that you want to use in the index.ts (such that our app uses the connection pool url) will be in wrangler.jsonc and all the environment variables that you want to use from the CLI will be in a .env file.

// 12. npm install @prisma/extension-accelerate

// 13. Next, generate Prisma Client that connects to your database through Prisma Accelerate over HTTP.
// npx prisma generate --no-engine

// The generated Client has a smaller bundle size and is optimized for edge environments like Cloudflare Workers. The smaller bundle size is due to the fact that the interfaces talking to the database(the Prisma ORM engines) are no longer bundled with the Prisma Client as the logic is now handled by Prisma Accelerate.

// 14. npx wrangler whoami --> to check whether you are loggedIn or not.

// If not logged in, then run npx wrangler login

// 15. npm run deploy --> basically means wrangler deploy

// Try sending a post request to the generated url to check whether data is being inserted into the database and that the pool is actually connected to the database.


// In this setup, Prisma Accelerate acts as the connection pool manager. It collects all the database requests from the serverless functions (workers) and manages the connections to the database. This ensures that the number of connections does not exceed the database's capacity and that the connections are efficiently reused, improving performance and scalability in serverless environments.



// `wrangler.jsonc` is the config file for Cloudflare Workers.

// It defines:
// * Worker name & entry file
// * Compatibility date/runtime settings
// * Deploy targets (account/zone)
// * Resource bindings (KV, D1, R2, env vars)
// * Build/deployment instructions
// * Manage environment variables

// 👉 In short: it tells Wrangler how to build, run, and connect your Worker to Cloudflare services.
