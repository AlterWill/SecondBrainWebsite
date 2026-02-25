import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import AddNote from "./pages/addNotes";
import {  useState } from "react";

function App() {
  const navigate = useNavigate();
  const [accessToken,setAccessToken] = useState(null);

  if(accessToken === null){
    navigate("/");
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <div className="bg-red-400 h-20">Header</div>
        <div className="bg-black flex flex-1">
          <div className="min-w-40 bg-green-400">SideBar</div>
          <Routes>
            <Route path="/" element={<Login setAccessToken={setAccessToken}/>}></Route>
            <Route path="/add" element={<AddNote accessToken={accessToken} />}></Route>
            <Route path="/home" element={ <Dashboard accessToken={accessToken}/> }></Route>
          </Routes>
        </div>
        <div className="bg-blue-400 min-h-20">Footer</div>
      </div>
    </BrowserRouter>
  );
}

export default App;
