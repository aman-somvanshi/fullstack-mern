import { useSearchParams } from "react-router-dom";
import { InputBox } from "../components/InputBox";
import { useState } from "react";
import axios from "axios";

const SendMoney = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [amount, setAmount] = useState();
    const name = searchParams.get("name");
    const id = searchParams.get("id");
    return (
        <>
            <div className="flex justify-center h-screen bg-gray-100">
                <div className="h-full flex flex-col justify-center">
                    <div className="h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-2xl rounded-lg">
                        <div className="flex flex-col space-y-1.5 pt-6">
                            <h2 className="text-3xl font-bold text-center">Send Money</h2>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center space-x-3 pb-3">
                                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                    <span className="text-2xl text-white" >{name[0]}</span>
                                </div>
                                <h3 className="text-2xl font-semibold">{name}</h3>
                            </div>
                            <div className="w-full p-2 pb-5">
                                <InputBox onChange={(e) => {
                                    setAmount(e.target.value);
                                }} label={"Amount (in Rs.)"} placeholder="Enter amount" />
                            </div>
                            <div>
                                <button onClick={async () => {
                                    await axios.post("http://localhost:3000/api/v1/account/transfer", {
                                        amount: amount,
                                        to: id
                                    },
                                    {
                                        headers: {
                                            Authorization: `Bearer ${localStorage.getItem("token")}`
                                        }
                                    }
                                )
                                }} type="button" className="justify-center rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">Initiate Transfer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SendMoney;