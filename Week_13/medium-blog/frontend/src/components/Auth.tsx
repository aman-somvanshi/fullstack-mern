import { type SignupInput } from "@aman_somvanshi/medium-blog-common";
import axios from "axios";
import { useState, type ChangeEvent} from "react";
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";

// you can read about trpc to understand extremely strict types on both frontend and backend
export const Auth = ({type} : {type: "signup" | "signin"}) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    });

    async function sendRequest () {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"}`, postInputs);
            const jwt = response.data.token;
            console.log(jwt);
            localStorage.setItem("token" , jwt);
            navigate("/blogs");
        } catch(e) {
            // alert the user here that the request failed
            alert("Error while signing up !");

        }
    }

    return (
        <>
            <div className="h-screen flex justify-center flex-col">
                <div className="flex justify-center">
                    <div>
                        <div className="px-10">
                            <div className="text-3xl font-extrabold">
                                Create an account
                            </div>
                            <div className="text-slate-500 pt-1">
                                {type==="signup"? "Already have an account ?" : "Don't have an account?"}
                                <Link to={type === "signup" ? "/signin" : "/signup"}className="pl-2 underline">{type === "signup" ? "Login" : "Sign up"}</Link>
                            </div>
                        </div>
                        <div className="pt-8">
                            {type === "signup" ? <LabelledInput label="Name" placeholder="Enter your name" onChange={(e) =>{
                            setPostInputs({
                                ...postInputs,
                                name: e.target.value
                                })
                            }}/> : null}
                            <LabelledInput label="Email" placeholder="Enter your email" onChange={(e) =>{
                                setPostInputs({
                                    ...postInputs,
                                    email: e.target.value
                                })
                            }}/>
                            <LabelledInput label="Password"
                            type="password"
                            placeholder="Enter your Password" onChange={(e) =>{
                                setPostInputs({
                                    ...postInputs,
                                    password: e.target.value
                                })
                            }}/>
                            <button onClick={sendRequest}className="px-8 py-2 w-full mt-8 bg-black text-white text-sm rounded-lg font-semibold hover:bg-black/[0.8] hover:shadow-lg">
                            {type === "signup" ? "Sign up" : "Sign in"}
                            </button>
                        </div>
                    </div>
                </div>         
             </div>
        </>
    )
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange : (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

const LabelledInput = ({label, placeholder, onChange, type} : LabelledInputType) => {
    return (
        <>
            <div>
            <label className="block mt-3 mb-2.5 text-sm font-bold text-heading">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-neutral-secondary-medium border border-gray-300 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-md placeholder:text-body" placeholder={placeholder} required />
        </div>
        </>
    )
}