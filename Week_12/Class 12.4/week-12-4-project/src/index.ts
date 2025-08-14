// write a function to create a users table in your database.
import { Client } from 'pg'
 
const client = new Client({
  connectionString: "postgresql://postgres:mysecretpassword@localhost/postgres"
})

async function createUsersTable() {
    await client.connect()
    const result = await client.query(`
        CREATE TABLE users2 (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `)
    console.log(result)
}

// async function insertUserData(username: string, password: string, email: string){
//     await client.connect();
//     const result = await client.query(
//         `INSERT INTO users2(username, password, email) VALUES ('${username}', '${password}' , '${email}' );`
//     );
//     console.log(result);
// }

// Above way of inserting data is insecure.
// To avoid SQL injection, use this way -
async function insertUserData(username: string, password: string, email: string){
    await client.connect();
    const result = await client.query(
        `INSERT INTO users2(username, password, email) VALUES ($1, $2, $3);`, [username, password, email]
    );
    console.log(result);
}

// createUsersTable();
// insertUserData("username1", "123", "user@gmail.com")
// insertUserData("username2", "12334322", "user2@gmail.com")
insertUserData("username3", "1233334322", "user3@gmail.com")


















// Transactions 
// import { Client } from 'pg';

// async function insertUserAndAddress(
//     username: string, 
//     email: string, 
//     password: string, 
//     city: string, 
//     country: string, 
//     street: string, 
//     pincode: string
// ) {
//     const client = new Client({
//         host: 'localhost',
//         port: 5432,
//         database: 'postgres',
//         user: 'postgres',
//         password: 'mysecretpassword',
//     });

//     try {
//         await client.connect();

//         // Start transaction
//         await client.query('BEGIN');

//         // Insert user
//         const insertUserText = `
//             INSERT INTO users (username, email, password)
//             VALUES ($1, $2, $3)
//             RETURNING id;
//         `;
//         const userRes = await client.query(insertUserText, [username, email, password]);
//         const userId = userRes.rows[0].id;

//         // Insert address using the returned user ID
//         const insertAddressText = `
//             INSERT INTO addresses (user_id, city, country, street, pincode)
//             VALUES ($1, $2, $3, $4, $5);
//         `;
//         await client.query(insertAddressText, [userId, city, country, street, pincode]);

//         // Commit transaction
//         await client.query('COMMIT');

//         console.log('User and address inserted successfully');
//     } catch (err) {
//         await client.query('ROLLBACK'); // Roll back the transaction on error
//         console.error('Error during transaction, rolled back.', err);
//         throw err;
//     } finally {
//         await client.end(); // Close the client connection
//     }
// }

// // Example usage
// insertUserAndAddress(
//     'johndoe', 
//     'john.doe@example.com', 
//     'securepassword123', 
//     'New York', 
//     'USA', 
//     '123 Broadway St', 
//     '10001'
// );












// Joins
// import { Client } from 'pg';

// // Async function to fetch user data and their address together
// async function getUserDetailsWithAddress(userId: string) {
//     const client = new Client({
//         host: 'localhost',
//         port: 5432,
//         database: 'postgres',
//         user: 'postgres',
//         password: 'mysecretpassword',
//     });

//     try {
//         await client.connect();
//         const query = `
//             SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
//             FROM users u
//             JOIN addresses a ON u.id = a.user_id
//             WHERE u.id = $1
//         `;
//         const result = await client.query(query, [userId]);

//         if (result.rows.length > 0) {
//             console.log('User and address found:', result.rows[0]);
//             return result.rows[0];
//         } else {
//             console.log('No user or address found with the given ID.');
//             return null;
//         }
//     } catch (err) {
//         console.error('Error during fetching user and address:', err);
//         throw err;
//     } finally {
//         await client.end();
//     }
// }
// getUserDetailsWithAddress("1");