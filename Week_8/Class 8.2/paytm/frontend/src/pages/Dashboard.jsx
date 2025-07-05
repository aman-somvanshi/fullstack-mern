import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

const Dashboard = () => {
    return (
        <>
            <div className="my-20 ml-16 mr-52">
                <Appbar />
                <Balance />
                <Users/>
            </div>
        </>
    )
}

export default Dashboard;