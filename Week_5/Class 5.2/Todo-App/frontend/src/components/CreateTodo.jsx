// Notice that a component filename should start with a capital letter.
// And it should have the extension "jsx"

// To do hosting
// use render network for backend
// use vercel for frontned

import { useState } from "react";

export function CreateTodo(){

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    return <div>
        <input style={{
            padding: 10,
            margin: 10
        }} type="text" placeholder="title" onChange={function(e) {
            const newTitle = e.target.value;
            setTitle(newTitle);
        }}></input>
        <br></br>

        <input style={{
            padding: 10,
            margin: 10
        }} type="text" placeholder="description" onChange={function (e) {
            const newDescription = e.target.value;
            setDescription(newDescription);
        }}></input>
        <br></br>

        <button style={{
            padding: 10,
            margin: 10
        }} onClick={async () => {
            const response = await fetch("http://localhost:3000/todo", {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    description: description
                }),
                headers: {
                    "Content-Type" : "application/json"
                }
            })
            const json = await response.json();
            alert("Todo added")
        }}>Add a Todo</button>
    </div>
}