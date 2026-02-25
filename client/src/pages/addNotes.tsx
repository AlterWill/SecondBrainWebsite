import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function AddNotes({saveNotes}){
  const navigate = useNavigate();
  const title = useRef<HTMLInputElement>(null);
  const text = useRef<HTMLTextAreaElement>(null);
  
  return (
    <div className="flex flex-col gap-4 m-auto">
       <input type="text" className="" ref={title} placeholder="Enter the title" />
       <textarea className="" ref={text} placeholder="Enter the text" />
       <button className="bg-white hover:bg-cyan-500 h-12 w-48 rounded-full m-auto" 
        onClick={() => { }} 
       > "save" </button>
    </div>
  );
}

export default AddNotes
