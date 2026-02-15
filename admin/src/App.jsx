import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/sidebar";
import List from "./pages/list";
import Orders from "./pages/orders";
import Add from "./pages/Add";
import { useState } from "react";
import Login from "./components/Login";

function App() {
  const [token, setToken] = useState("");
  return (
    <div className="bg-gray-50 min-h-screen">
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add />} />
                <Route path="/list" element={<List />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
