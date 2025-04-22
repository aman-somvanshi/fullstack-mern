import { BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
// import React from "react";
import {lazy, Suspense} from "react";
// import { Landing } from "./components/Landing";
// import { Dashboard } from "./components/Dashboard";

const Dashboard = lazy(() => import("./components/Dashboard"));
const Landing = lazy(() => import("./components/Landing"))

function App() {

  // useNavigate -  It makes sure that it is not doing a hard reload of the page. It is simply changing the route keeping the same client side bundle and changing the component on the page (since the route is changed).

  // const navigate = useNavigate();  // you cannot use useNavigate here because it is outside of the BrowserRouter component
  return (
    <div>
      {/* <div style={{
        backgroundColor: "skyblue"
      }}> This is a top bar which remains unchanged throughout all routes</div> */}

      {/* <div style={{
        backgroundColor: "skyblue"
      }}>
        <button onClick={() => {
          // window.location.href = "/dashboard" // This will cause a hard reload which is not recommended in React. Because we should be using client side routing that enables us to load different components on the same page without a hard reload.
          navigate("/dashboard")

        }}>Go to Dashboard</button>

        <button onClick={() => {
          // window.location.href = "/" // This will cause a hard reload which is not recommended in React. Because we should be using client side routing that enables us to load different components on the same page without a hard reload.

          navigate("/")
        }} >Go to Landing</button>
      </div> */}
      <BrowserRouter>
        <AppTopBar />
        <Routes>
          <Route path="/dashboard" element={<Suspense fallback={"...loading"}><Dashboard/></Suspense>} />
          <Route path="/" element={<Suspense fallback={"...loading"}><Landing /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

function AppTopBar() {
  const navigate = useNavigate();
  return <div>
    <div>
      <button onClick={() => {
        navigate("/dashboard") // This doesn't cause a hard reload
      }}>Go to Dashboard</button>
      <button onClick={() => {
        navigate("/") // This doesn't cause a hard reload
      }}>Go to Landing Page</button>
    </div>
  </div>
}

export default App
