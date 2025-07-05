import { useState } from "react";
import useAsyncEffect from "use-async-effect"
import axios from "axios";

export function Balance(){

    const [balance, setBalance] = useState(0);

    useAsyncEffect( async () => {
        const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        setBalance(response.data.balance);
    })
    return (
        <>
            <div className="flex py-4 px-4">
                <div className="flex">
                    <div className="text-lg font-bold pr-2.5">Your balance</div>
                    <div className="text-lg font-semibold">Rs. {balance}</div>
                </div>
            </div>
        </>
    )
}