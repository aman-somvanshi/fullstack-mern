// Revise SQL databases class before proceeding

// Let's run a postgres server locally through Docker

// Execute the following command -
// docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres

// Connection String - 
// postgresql://postgres:mysecretpassword@localhost:5432/postgres?sslmode=disable


// Run the following command -
// docker exec -it <container_id> /bin/bash

// means:

// docker exec → Run a command inside an already running container.
// -i → interactive mode. Keeps STDIN (your keyboard input) open so you can type commands into the container.
// -t → Allocate a TTY (a terminal interface) so the command can behave like it’s in a real terminal.
// <container_id> → The ID or name of the container where you want to run the command.
// /bin/bash → The command you want to run — here, it’s starting the Bash shell inside the container.


// This terminal already contains psql. you don't need to install it.
// To run psql inside the docker container -
// psql -h localhost -d postgres -U postgres

// Here, -h --> host
//       -d --> database
//       -U --> User 



// Let us now create a users table inside our database using the SQL command -
// CREATE TABLE users (
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(50) UNIQUE NOT NULL,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
// );


// now run \dt to view all the tables inside your database

// Now insert the data inside the table -
// INSERT INTO users (username, email, password) VALUES ('username_here', 'user@example.com', 'user_password');

// Output - INSERT 0 1
// Here, 0 is the OID (Object Identifier) of the newly inserted row.
// “Your INSERT worked, no special OID was assigned, and 1 row was added to the table.”


// Now let's view the data
// SELECT * FROM users WHERE id = 1;

// Now let's UPDATE data
// UPDATE users SET password = 'new_password' WHERE email = 'user@example.com';

// Now let's DELETE data
// DELETE FROM users WHERE id = 1;








// Now let's understand , how we can perform the same commands through a Nodejs application.
// Run the following commands -
// mkdir week-12-4-project
// cd week-12-4-project
// npm init -y
// npx tsc --init

// Now setup the rootDir and outDir to src and dist respectively in the tsconfig.json file.

// npm i pg
// npm install --save @types/pg

// Write index.ts in src. write a create table command.

// Refer to index.ts

// tsc -b
// node dist/index.js


// IMPORTANT NOTE - PostgreSQL does not accept double quotes (") for string literals — it uses single quotes (').










// Relationships and Transactions

// Relationships let you store data in different tables and relate it with each other.


// Relationships in Mongodb
// Since mongodb is a NoSQL database, you can store any shape of data in it. 
// If I ask you to store a users details along with their address, you can store it in an object that has the address details.

// Relationships in SQL

// We can try storing the address within the same table by just storing the different sub-columns of address object as the columns of the main table. But this approach won't work if there are multiple adresses. Because then if the same user has 2 different addreses, we would need to store the data in two different rows but having the same user id which isn't possible.

// Since SQL can not store objects as such, we need to define two different tables to store this data in.

// Refer to the image- Relationships in sql.webp

// This is called a relationship , which means that the Address table is related to the Users table.

// So, the user_id column inside the Address table is a foreign key to the id of users in the users table. If in the address table, we try to insert the user_id of a user which is not present in the users table, SQL would stop us there.

// When defining the table, you need to define the relationship.

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


// ON DELETE CASCADE --> in PostgreSQL is a rule you put on a foreign key so that:

// If a row in the parent table is deleted, all related rows in the child table are automatically deleted too.

// So basically, if a user is deleted from the users table, then all the addresses stored in the address table corresponding to that user will be automatically deleted.

// Without ON DELETE CASCADE:
// PostgreSQL will block you from deleting a user who still has orders (foreign key violation), unless you delete the orders manually first.



// ON DELETE RESTRICT is a foreign key rule that says:
// You cannot delete a row from the parent table if there are matching rows in the child table.




// Now after we've created an Address table using psql.
// Let's try inserting an address for a user
// INSERT INTO addresses (user_id, city, country, street, pincode) VALUES (2, 'New York', 'USA', '123 Broadway St', '10001');

// Let's add another address for the same user
// INSERT INTO addresses (user_id, city, country, street, pincode) VALUES (2, 'New York2', 'USA2', '123 Broadway St', '10001');
 


// Now let's try out ON DELETE RESTRICT by creating another table addresses2

// CREATE TABLE addresses2 (
//     id SERIAL PRIMARY KEY,
//     user_id INTEGER NOT NULL,
//     city VARCHAR(100) NOT NULL,
//     country VARCHAR(100) NOT NULL,
//     street VARCHAR(255) NOT NULL,
//     pincode VARCHAR(20),
//     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
// );

// Insert two data entries for the same user.
// Now try deleting that user.

// We face an error -
// update or delete on table "users" violates foreign key constraint "addresses2_user_id_fkey" on table "addresses2"












// Transactions
// If we want to run multiple SQL Queries, such that either all of them run or none of them do, then we use Transactions.

// Imagine you’re transferring money between two bank accounts:
// Subtract ₹500 from Account A
// Add ₹500 to Account B
// If something goes wrong after step 1 (like a power failure), you don’t want money to vanish.
// A transaction ensures that both steps succeed together or both are cancelled.


// Let's take an example -
// BEGIN; -- Start transaction

// INSERT INTO users (username, email, password)
// VALUES ('john_doe', 'john_doe1@example.com', 'securepassword123');

// INSERT INTO addresses (user_id, city, country, street, pincode)
// VALUES (currval('users_id_seq'), 'New York', 'USA', '123 Broadway St', '10001');

// COMMIT;




// Refer to index.ts for Node.js code for Transactions












// Joins

// Defining relationships is easy.
// What’s hard is joining  data from two (or more) tables together.
// For example, if I ask you to fetch me a users details and  their address, what SQL would you run?


// Approach 1 (Bad)
// -- Query 1: Fetch user's details
// SELECT id, username, email
// FROM users
// WHERE id = YOUR_USER_ID;

// -- Query 2: Fetch user's address
// SELECT city, country, street, pincode
// FROM addresses
// WHERE user_id = YOUR_USER_ID;


// I am sending two MediaQueryListEvent. So roundtrips to database is two times. Also, what if there is some change in the data after the first query has ran. There is no transactional integrity


// Approach 2 (using joins)
// SELECT users.id, users.username, users.email, addresses.city, addresses.country, addresses.street, addresses.pincode
// FROM users
// JOIN addresses ON users.id = addresses.user_id
// WHERE users.id = '3';

// SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
// FROM users u
// JOIN addresses a ON u.id = a.user_id
// WHERE u.id = YOUR_USER_ID;


// Refer to index.ts for Nodejs code for joins




// Benefits of using a join - 
// 1. Reduced Latency
// 2. Simplified Application Logic
// 3. Transactional Integrity










// Types of Joins

// 1. INNER JOIN
// Returns rows when there is at least one match in both tables. If there is no match, the rows are not returned. It's the most common type of join.
// Use Case: Find All Users With Their Addresses. If a user hasn’t filled their address, that user shouldn’t be returned

// SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
// FROM users
// INNER JOIN addresses ON users.id = addresses.user_id;


// 2. LEFT JOIN
// Returns all rows from the left table, and the matched rows from the right table.
// Use case - To list all users from your database along with their address information (if they've provided it), you'd use a LEFT JOIN. Users without an address will still appear in your query result, but the address fields will be NULL for them.
// SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
// FROM users
// LEFT JOIN addresses ON users.id = addresses.user_id;

// 3. RIGHT JOIN
// Returns all rows from the right table, and the matched rows from the left table.
// Use case - Given the structure of the database, a RIGHT JOIN would be less common since the addresses table is unlikely to have entries not linked to a user due to the foreign key constraint. However, if you had a situation where you start with the addresses table and optionally include user information, this would be the theoretical use case.
// SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
// FROM users
// RIGHT JOIN addresses ON users.id = addresses.user_id;

// 4. FULL JOIN
// Returns rows when there is a match in one of the tables. It effectively combines the results of both LEFT JOIN and RIGHT JOIN.
// Use case - A FULL JOIN would combine all records from both users and addresses, showing the relationship where it exists. Given the constraints, this might not be as relevant because every address should be linked to a user, but if there were somehow orphaned records on either side, this query would reveal them.
// SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
// FROM users
// FULL JOIN addresses ON users.id = addresses.user_id;