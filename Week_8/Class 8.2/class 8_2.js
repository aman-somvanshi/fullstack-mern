// Slides Link - https://projects.100xdevs.com/tracks/oAjvkeRNZThPMxZf4aX5/JLaLbhDuYn3h5Cn7WJu1

// Note -

// module.exports :
// Used in:
// Node.js (traditional system)
// Files run with require()


// export const / export default – ES Modules (ESM)
// Used in:
// Modern JS (React, ES6+, TypeScript)
// Browser-based and modern Node.js projects (type: "module" in package.json)

// To understand password hashing - https://mojoauth.com/blog/hashing-passwords-in-nodejs/

// Argon2 is the newest hashing algorithm out of the mentioned three. It emerged as the winner of the Password Hashing Competition in 2015.

// npm i argon2


// using or in mongoose - https://stackoverflow.com/questions/7382207/mongooses-find-method-with-or-condition-does-not-work-properly


// using like operator(from sql) in mongo - https://stackoverflow.com/questions/3305561/how-to-query-mongodb-with-like




//Transactions

// In case of transactions, we have to make sure that the operations are atomic, meaning they either complete fully or not at all. This is crucial for maintaining data integrity, especially in financial applications like Paytm.

// Suppose there are 2 datbase calls, one to deduct money from one account and another to add it to another account. If the first operation succeeds but the second fails, it could lead to a loss of funds. To prevent this, we can use transactions.

// What if the Node.js crashes after the first update?

// It would lead to a database inconsistency. Amount would get debited from the first user, and not credited into the other users account.

// If a failure ever happens, the first txn should rollback.

// This is what is called a transaction in a database. We need to implement a transaction on the next set of endpoints that allow users to transfer INR

// In the signup endpoint, we had to give the user a random balance between 1 and 10000.
// This is so we don’t have to integrate with banks and give them random balances to start with.

// The bad solution for transfrring money assumes that both the database and the nodejs server are always up and running. But in reality, they can crash at any time.

// Hence, we make use of transactions.

// Whatever we write from session.startTransaction() to session.commitTransaction() will be treated as a single transaction. And either all of it will be applied to the database or none of it will.




// Replica Set

// A replica set in MongoDB is a group of servers (nodes) that store the same data to provide:
// ✅ High availability
// ✅ Automatic failover
// ✅ Data redundancy

// A replica set usually has:
// 🟢 Primary – only node that can write data.
// 🟡 Secondary(s) – read-only copies of the primary. They sync automatically.
// ⚪ (Optional) Arbiter – doesn't store data but helps vote to elect a new primary during failover.

// 🔄 How it works:
// You write data to the primary.
// MongoDB automatically copies that data to the secondaries.
// If the primary goes down, the secondaries elect a new primary within seconds.




// Causal Consistency

// Causal consistency ensures that operations that are logically related (cause and effect) happen in the correct order when you read them — even in a distributed database like MongoDB.

// If the database is causally consistent, it will guarantee that once you’ve written something (like a message), any read after that (even on another replica) will see that write.

// 🛢️ In MongoDB terms:
// Write 1: User A updates balance → balance = 100

// Write 2: User A sends money → balance = 50

// Now, if you read, MongoDB ensures you see balance = 50, not the old 100.

// Without causal consistency, some nodes might show stale reads that don’t reflect the order in which things happened.




// Session

// A session is like a transaction wrapper.
// It ensures grouped operations are safe and consistent.
// You must pass the session object into each operation to include it in the transaction.



// For the frontend part , refer to class 8_4.js