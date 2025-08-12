// Revise the pre-requisites of interface and types in ts before proceeding further

// Refer to index.ts file in src folder






// 1) Pick 
// The Pick utility type allows you to construct new types by selecting a set of properties from an existing type (or an interface as well).

// refer to index.ts for example




// 2) Partial
// Partial makes all properties of a type optional, creating a type with the same properties, but each marked as optional.

// This is particularly useful when you want to update a subset of an object's properties without needing to provide the entire object.




// 3) Readonly
// We can update the values inside an object and array even when we have declared them as constant while when we do it for a string declared as constant, typescript stops us from doing so.

// The Readonly utility type in TypeScript is used to make all properties of a given type read-only. This means that once an object of this type is created, its properties cannot be reassigned. It's particularly useful for defining configuration objects, constants, or any other data structure that should not be modified after initialization.

// TypeScript’s Readonly is a development-time safety net. It tells the TypeScript compiler that an object’s properties shouldn’t be changed, helping you avoid accidental edits to things like configuration objects. But this protection exists only while coding and compiling; once the code runs as JavaScript, there’s no built‑in immutability. If you need real runtime protection, use something like Object.freeze in addition to Readonly.










// 4) Record and Map

// Record is a typescript concept.
// Record lets you give a cleaner type to objects.
// In TypeScript, a Record is just a shortcut for saying:
// “I want an object where the keys have a specific type, and the values have another specific type.”
//  It provides a cleaner and more concise syntax for typing objects when you know the shape of the values but not the keys in advance.

// Syntax
// Record<KeyType, ValueType>
// KeyType → type of the keys (e.g., string, number, or a union like 'name' | 'age')
// ValueType → type of the values




// Map is a js concept.

// In TypeScript (and JavaScript), a Map is a built-in object that stores key–value pairs, but unlike plain objects:

// 1. Keys can be any type (not just strings or symbols) — e.g., numbers, objects, functions.
// 2. It remembers the insertion order of keys.
// 3. It has built-in methods for adding, getting, deleting, and checking values.

// Syntax

// Map<KeyType, ValueType>

// KeyType → type of the keys
// ValueType → type of the values




// Record vs. Map

// - Use `Record` when : You are working with objects that have a fixed shape for values and string keys. It's ideal for typing object literals with known value types.
// - Use `Map` when : You need more flexibility with keys (not just strings or numbers), or you need to maintain the insertion order of your keys. Maps also provide better performance for large sets of data, especially when frequently adding and removing key-value pairs.












// 5) Exclude
// In a function that can accept several types of inputs but you want to exclude specific types from being passed to it.




// Type inference in Zod

// First do npm install express @types/express zod
// Type inference in Zod is a powerful feature that allows TypeScript to automatically determine the type of data validated by a Zod schema.

// Our goal is to create a compile time variable through which typescript can validate the type at compile time while also ensuring that we don't have to write the same code twice.


// How Type Inference Works in Zod
// Zod schemas define the shape and constraints of your data at runtime. When you use Zod with TypeScript, you can leverage Zod's type inference to automatically generate TypeScript types based on your Zod schemas.

// This means you don't have to manually define TypeScript interfaces or types that replicate your Zod schema definitions, reducing redundancy and potential for error.

// Must refer to index.ts before reading down below -

// Zod infers a static type from your schema definitions. You can extract this type with the z.infer<> utility and use it however you like.

// const Player = z.object({ 
//   username: z.string(),
//   xp: z.number()
// });
 
// // extract the inferred type
// type Player = z.infer<typeof Player>;
 
// // use it in your code
// const player: Player = { username: "billie", xp: 100 };


