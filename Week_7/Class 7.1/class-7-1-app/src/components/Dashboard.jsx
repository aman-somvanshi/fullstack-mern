
export default function Dashboard(){
    return <div style={{
        backgroundColor: "black",
        color: "white"
    }}>
        Dashboard page
    </div>
}

// without writing default , you would be importing Dashboard like this:
// import { Dashboard } from "./components/Dashboard";

// you can have multiple exports from a file such as:
// export const a = 1;
// export const b = 2;

// But there can be only one default export in a file.

// and with default, you would be importing Dashboard like this:
// import Dashboard from "./components/Dashboard";