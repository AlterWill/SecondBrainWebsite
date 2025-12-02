import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function AddNotes({saveNotes}){
  const navigate = useNavigate();
  const title = useRef();
  const text = useRef();
  
  function inputData(){
    if(title.current.value.trim() == "" || text.current.value.trim() == ""){
      alert("enter a proper values");
      return ({success:false})
    }
    return ({title:title.current.value,note:text.current.value,success:true})
  }

  return (
    <div className="flex flex-col gap-4 m-auto">
       <input 
          type="text" 
          className="" 
          ref={title} 
          placeholder="Enter the title" 
       />
       <textarea 
          className="" 
          ref={text} 
          placeholder="Enter the text" 
       />
       <button 
        className="bg-white hover:bg-cyan-500 h-12 w-48 rounded-full m-auto"
        onClick={() => {
          let a = inputData()
          if(a.success == true){
            saveNotes({title:a.title,note:a.note})
            navigate("/home")
          }
        }}
       > "save" </button>
    </div>
  );
}

export default AddNotes
