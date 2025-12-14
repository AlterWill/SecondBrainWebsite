import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard({user}){
  const navigate = useNavigate();
  const [notes,setNotes] = useState<{title:string,note:string}[]>([])
  const url:string = 'http://localhost:3000/home'

  useEffect(() => {
    const fetchData = async () => {
      let res = await axios.get(url);
      if(res.status!=200) {
        alert('couldn\'t fetch'); return 
      }
      setNotes(res.data)
    }
    fetchData();
  },[])

  return (
    <div className="">
      <div className="p-10 flex flex-wrap gap-2 ">
        { notes.length == 0 && ( <p className="text-white">No notes yet</p> ) }
        { notes.map((note,index) => (
        <div className="flex flex-col justify-between border-white bg-gray-300 size-56 rounded-lg ">
         <p className="text-center text-orange-600 font-bold break-words line-clamp-1">
            {note.title}
          </p>
          <p className="px-3 pt-2 h-48 text-cyan-600 break-words line-clamp-6">
              {note.note}
          </p>
          <button
            className="bg-red-300 rounded-md size-9"
            onClick={() => editNote(index)}
          >edit</button>
        </div>
        ))}
      </div>
      <button
        className="fixed right-6 bottom-24 h-12 w-12 bg-red-300 rounded-full"
        onClick={() => navigate("/add")}
      >+</button>
    </div>
  );
}

export default Dashboard
