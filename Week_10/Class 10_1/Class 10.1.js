// 💡 What all we’ll learn today -
// Simple - SQL vs NoSQL, how to create Postgres Databases, How to do CRUD on them
// Advance - Relationships, Joins, Transactions



// Types of Databases
// There are a few types of databases, all service different types of use-cases


// NoSQL databases
// Store data in a schema-less fashion. Extremely lean and fast way to store data. 
// Examples - MongoDB

// Graph databases 
// Data is stored in the form of a graph. Specially useful in cases where relationships need to be stored (social networks
// Examples - Neo4j

// Vector databases
// Stores data in the form of vectors
// Useful in Machine learning
// Examples - Pinecone

// Graph and Vector databases are used in AI applications.

// SQL databases
// Stores data in the form of rows
// Most full stack applications will use this
// Examples - MySQL, Postgres








// Why not NoSQL?

// You might’ve used MongoDB 
// It’s schemaless properties make it ideal to for bootstraping a project fast.
// But as your app grows, this property makes it very easy for data to get corrupted

// What is schemaless?
// Different rows can have different schema (keys/types)



// Problems?
// 1. Can lead to inconsistent database
// 2. Can cause runtime errors 
// 3. Is too flexible for an app that needs strictness
 
// Upsides?
// 1. Can move very fast
// 2. Can change schema very easily

// 💡You might think that mongoose does add strictness to the codebase because we used to define a schema there. 
// That strictness is present at the Node.js level, not at the DB level. You can still put in erroneous data in the database that doesn’t follow that schema.





// Why SQL?

// SQL databases have a strict schema. They require you to
// 1. Define your schema
// 2. Put in data that follows that schema
// 3. Update the schema as your app changes and perform migrations
 
// So there are 4 parts when using an SQL database (not connecting it to Node.js, just running it and putting data in it)
// 1. Running the database.
// 2. Using a library that let’s you connect and put data in it.
// 3. Creating a table and defining it’s schema.
// 4. Run queries on the database to interact with the data (Insert/Update/Delete)


// In other words,
// Lifecycle of an SQL Application
// 1. Bring up your DB
// 2. Tell the DB what is your schema
// 3. Put data
// 4. Update Schema






// Creating a database
// Connection string for neon db looks like -

// postgresql://username:password@host/database

// we have used the tilde `` operator here to have a multi line query





// Using a library that let's you connect and put data in it

// 1. psql
// psql is a terminal-based front-end to PostgreSQL. It provides an interactive command-line interface to the PostgreSQL (or TimescaleDB) database. With psql, you can type in queries interactively, issue them to PostgreSQL, and see the query results.

// How to connect to your database?
// psql Comes bundled with postgresql. You don’t need it for this tutorial. We will directly be communicating with the database from Node.js

// 2. pg
// pg is a Node.js library that you can use in your backend app to store data in the Postgres DB (similar to mongoose). We will be installing this eventually in our app.







// Creating a table and defining it's schema

// 1. Tables in SQL
// A single database can have multiple tables inside. Think of them as collections in a MongoDB database.

// Until now, we have a database that we can interact with. The next step in case of postgres is to define the schema of your tables.
// SQL stands for Structured query language. It is a language in which you can describe what/how you want to put data in the database.
// To create a table, the command to run is - 
// CREATE TABLE users (
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(50) UNIQUE NOT NULL,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
// );


// Here,

// SERIAL: A PostgreSQL-specific data type for creating an auto-incrementing integer. Every time a new row is inserted, this value automatically increments, ensuring each user has a unique id.

// TIMESTAMP WITH TIME ZONE: This data type stores both a timestamp and a time zone, allowing for the precise tracking of when an event occurred, regardless of the user's or server's time zone.

// DEFAULT CURRENT_TIMESTAMP: This default value automatically sets the created_at column to the date and time at which the row is inserted into the table, using the current timestamp of the database server.





// Interacting with the database
// There are 4 things you’d like to do with a database 

// 1. INSERT
// INSERT INTO users (username, email, password)
// VALUES ('username_here', 'user@example.com', 'user_password');

// Notice how you didn’t have to specify the id  because it auto increments


// 2. UPDATE
// UPDATE users
// SET password = 'new_password'
// WHERE email = 'user@example.com';

// 3. DELETE
// DELETE FROM users
// WHERE id = 1;

// 4. Select
// SELECT * FROM users
// WHERE id = 1;












// How to do queries from a Node.js app?

// In the end, postgres exposes a protocol that someone needs to talk to be able to send these commands (update, delete) to the database.
// psql  is one such library that takes commands from your terminal and sends it over to the database.
// To do the same in a Node.js , you can use one of many Postgres clients


// pg library
// https://www.npmjs.com/package/pg
// Non-blocking PostgreSQL client for Node.js. 
// Documentation - https://node-postgres.com/


// Creating a simple Node.js app

// 1. Initialise an empty typescript project
// npm init -y
// npx tsc --init

// 2. Change the rootDir and outDir in tsconfig.json
// "rootDir": "./src",
// "outDir": "./dist",

// 3. Install the pg library and it’s types (because we’re using TS)
// npm install pg
// npm install @types/pg  --> This is an auxiliary library which the pg library expects us to install

// Create a simple Node.js app that lets you put data


// So first we created a function for creating a table.
// Then we created a function to insert data into the table.
// BUT we understoosd that — in a real-world app, you'd get this data from user input (like from a form through express). If you build your query by directly inserting user input into the SQL string, you're vulnerable to SQL injection.


//     const result = await client.query(`INSERT INTO users (username, email, password)
// VALUES ('aman_here', 'aman@example.com', 'password'); DROP TABLE users; --`)

// Notice how SQL injection is happening in the above line. The final query becomes:
// INSERT INTO users (username, email, password)
// VALUES ('hacker', 'hacker@email.com', 'password'); DROP TABLE users; --');

// -- is a comment in SQL, so anything after is ignored (closing quote, etc.)


// More secure way to store data.
// Update the code so you don’t put user provided fields in the SQL string

// refer to index.ts from week_10_project/src folder












//  RELATIONSHIPS

// Relationships let you store data in different tables and relate it with each other.


// Relationships in Mongodb
// Since mongodb is a NoSQL database, you can store any shape of data in it. 
// If I ask you to store a users details along with their address, you can store it in an object that has the address details.


// Relationships in SQL
// Since SQL can not store objects as such, we need to define two different tables to store this data in.

// 🔗 What is a Foreign Key?
// A foreign key is a way to link two tables together.
// It’s a column in one table that refers to the primary key of another table.
// This helps maintain a relationship between the two tables.

// Refer to the image - relationships in SQL.
// Wee can only put some data in the Address table only if there exists a corresponding user for it in the users table. 
// We need to specify that user_id in the address table is a foreign key which references id in the users table.


// When defining the table, you need to define the relationship --->

// CREATE TABLE users (
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(50) UNIQUE NOT NULL,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
// );

// CREATE TABLE addresses (
//     id SERIAL PRIMARY KEY,
//     user_id INTEGER NOT NULL,
//     city VARCHAR(100) NOT NULL,
//     country VARCHAR(100) NOT NULL,
//     street VARCHAR(255) NOT NULL,
//     pincode VARCHAR(20),
//     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
// );


// ON DELETE CASCADE ---> this means if a user is deleted then the corresponding address in the Address table should also be deleted.











// JOINS

// Defining relationships is easy.
// What’s hard is joining  data from two (or more) tables together.
// The benefit of using joins is we can run a single query to get data from two related tables.
// For example, if I ask you to fetch me a users details and  their address, what SQL would you run?


// Bad Approach

// -- Query 1: Fetch user's details
// SELECT id, username, email
// FROM users
// WHERE id = YOUR_USER_ID;

// -- Query 2: Fetch user's address
// SELECT city, country, street, pincode
// FROM addresses
// WHERE user_id = YOUR_USER_ID;


// Better Approach (using joins)

// SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
// FROM users u
// JOIN address a ON u.id = a.user_id
// WHERE u.id = YOUR_USER_ID;


// Benefits of using a join - 
// 1. Reduced Latency (It takes two requests)
// 2. Simplified Application Logic
// 3. Transactional Integrity (Supoose the first query executed but the second failed)
 



// Good Question
// How to avoid expensive joins?








// 🔄 What Are Migrations?
// Migrations are like version control for your database.

// Just like you track changes in your code using Git, migrations track changes in your database structure (like creating tables, adding columns, changing data types, etc.).

// For example, if you want to add a new column to a table, you write a migration file that tells the database how to do that. When you run the migration, the change is made for you. If you later need to remove the column, another migration can undo the change



// Understanding Vector Databases:

// Let’s take an example to understand vector databases more effectively, consider the following

// Aman lives in India ⇒ [1, 2, 2, 2, 2,2 ]
// Aman is from Delhi ⇒ [1, 2, 2, 2, 3]
// Aman has been living in India, Delhi⇒ [1, 2, 2, 2, 2, 3]
// The world is round ⇒ [1, 2, 10001, 1001, 001001]
// Pacman is such a good game ⇒ [100, 10001, 20020, 1-001, 100]


// In the examples provided, the vectors for statements about "Aman" and "India" have similar coordinates because they contain similar words or concepts. The presence of identical numbers in different vectors indicates that those vectors represent statements with shared words or meanings. For instance, the repeated '2' in the vectors might indicate common words or a common structure in the statements, while unique identifiers like '3001' for "Aman" or '3' for "Delhi" show up in vectors representing statements about those specific entities.

// Vector databases leverage this property to perform efficient similarity searches. When a query vector is provided, the database can quickly find other vectors with similar coordinates, which correspond to records containing similar words or concepts, thus retrieving relevant information based on semantic similarity.