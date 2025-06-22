/* todos = [
    {
        title: "go to gym",
        description: "fsf"
    },
    {
    }
]
*/

// todos here is an array of objects
export function Todos({todos}) { // {todos} is used instead of props.todos to make the syntax easier. It is called object destructuring.
    return <div>
        {/* Let's iterate over the todos array using the map function */}
        {todos.map(function (todo) { // todo here is a single object from the todos array
            return <div>
                <h1>{todo.title}</h1>
                <h2>{todo.description}</h2>
                <button onClick={async function (){
                    await fetch("http://localhost:3000/completed", {
                        method : "PUT",
                        body: JSON.stringify({
                            id: todo._id,
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                    )
                    alert("Todo Marked as completed")
                }}>{todo.completed == true ? "Completed" : "Mark as complete"}</button>
            </div>
        })}
    </div>
}

// NOTE - A component MUST return a single parent div.