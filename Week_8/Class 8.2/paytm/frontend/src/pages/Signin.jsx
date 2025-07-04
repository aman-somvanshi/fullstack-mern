import { SubHeading } from "../components/SubHeading";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    return (
        <>
            <div className="bg-slate-300 h-screen flex justify-center">
                <div className=" flex flex-col justify-center">
                    <div className="bg-white w-80 text-center rounded-lg p-2 h-max px-4">
                        <Heading label={"Sign In"}/>
                        <SubHeading label={"Enter your credentials to access an account"} />
                        <InputBox onChange={(e) => {
                            setUsername(e.target.value);
                        }} label={"Email"} placeholder={"Enter your email"}/>
                        <InputBox onChange={(e) => {
                            setPassword(e.target.value);
                        }} label={"Password"} placeholder={"Enter your Password"}/>
                        <div className="pt-4">
                            <Button onClick={async () => {
                                const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                    username,
                                    password
                                })
                                localStorage.setItem("token", response.data.token);
                                navigate("/dashboard")
                            }} label={"Sign In"} />
                        </div>
                        <BottomWarning label={"Don't have an account ? "} buttonText={" Sign Up"} to={"/signup"} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signin;