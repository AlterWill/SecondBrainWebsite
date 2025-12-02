import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import Dashboard from "./dashboard";
import AddNote from "./addNotes";
import { useState } from "react";

function App() {
  const [notes,setNotes] = useState([{"title":"default title","note":"notes written here"},{"title":"default title","note":"notes written here"}]);
  function saveNotes(note){
    setNotes([...notes,note])
  }
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <div className="bg-red-400 h-20">Header</div>
        <div className="bg-black flex flex-1">
          <div className="min-w-40 bg-green-400">SideBar</div>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/add" element={<AddNote saveNotes={saveNotes} />}></Route>
            <Route path="/home" element={ <Dashboard notes={notes}/> }></Route>
          </Routes>
        </div>
        <div className="bg-blue-400 min-h-20">Footer</div>
      </div>
    </BrowserRouter>
  );
}

export default App;
