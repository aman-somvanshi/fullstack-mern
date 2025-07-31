"use strict";
// write a function to create a users table in your database
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Connection String Format -
// postgresql://username:password@host/database
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: 'postgresql://neondb_owner:npg_T5w0IPHkBblG@ep-icy-bonus-aeakwxvv-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
});
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const result = yield client.query(`CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`); // we have used the tilde `` operator here to have a multi line query
        console.log(result);
    });
}
// createUsersTable();
// async function insertData() {
//     await client.connect();
//     const result = await client.query(`INSERT INTO users (username, email, password)
// VALUES ('aman_here', 'aman@example.com', 'aman_password');`)
// // This is an insecure way to store data in your tables. 
// // When you expose this functionality eventually via HTTP, someone can do an SQL INJECTION to get access to your data/delete your data.
// //     const result = await client.query(`INSERT INTO users (username, email, password)
// // VALUES ('aman_here', 'aman@example.com', 'password'); DROP TABLE users; --`)
// // Notice how SQL injection is happening in the above line. The final query becomes:
// // INSERT INTO users (username, email, password)
// // VALUES ('hacker', 'hacker@email.com', 'password'); DROP TABLE users; --');
// // -- is a comment in SQL, so anything after is ignored (closing quote, etc.)
//     console.log(result);
// }
// insertData();
// More secure way to store data.
// Update the code so you don’t put user provided fields in the SQL string
// To prevent SQL injection, we can structure the query like this:
// Also, what we are trying to do is to ensure that postgres knows that username, email and password are values and shouldn't be considered as a SQL query.
function insertData(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const insertQuery = `INSERT INTO users(username, email, password) VALUES ($1, $2, $3)`;
        const values = [username, email, password];
        const res = yield client.query(insertQuery, values);
    });
}
// insertData('username2', 'username2@example.com', 'username2_password');
function getUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const query = `SELECT * FROM users WHERE email = $1`;
            const values = [email];
            const result = yield client.query(query, values);
            if (result.rows.length > 0) {
                console.log('User found:', result.rows[0]);
                return result.rows[0];
            }
            else {
                console.log('No user found with the given email.');
                return null;
            }
        }
        catch (err) {
            console.error('Error during fetching user:', err);
            throw err; // Rethrow or handle error appropriately
        }
        finally {
            yield client.end(); // Close the client connection
        }
    });
}
getUser('aman@example.com').catch(console.error);
