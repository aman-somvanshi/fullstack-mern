import {useAsyncEffect} from "use-async-effect";
import { Button } from "./Button"
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Users() {

    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");


    // Add debouncing here
    useAsyncEffect( async () => {
        const response = await axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        setUsers(response.data.user);
    }, [filter]);

    return (
        <>
            <div className="py-4 px-4">
                <div className="text-lg font-bold">Users</div>
                <div>
                    <input onChange={(e) =>{
                        setFilter(e.target.value);
                    }} className="border border-slate-200 rounded px-2 w-fit py-1" type="text" placeholder="Search users..."></input>
                </div>
                <div>
                    {users.map(user => <User user={user}/>)}
                </div>
            </div>
        </>
    )
}

function User({user}){

     const navigate = useNavigate();

    return (
        <>
            <div className="shadow flex justify-between py-5">
                <div className="flex">
                    <div className="rounded-full h-9 w-9 bg-slate-200 flex justify-center mt-1 mr-2">
                        <div className="flex flex-col justify-center h-full text-lg">
                            {user.firstName[0]}
                        </div>
                    </div>
                    <div className="text-lg font-semibold py-2 pl-1 pr-2">{user.firstName}</div>
                    <div className="text-lg font-semibold py-2">{user.lastName}</div>
                </div>
                <div>
                    <Button label="Send Money" onClick={() => {
                        navigate("/send?id=" + user._id + "&name=" + user.firstName);
                    }}/>
                </div>
            </div>
        </>
    )
}