import { useRef, useState } from "react";

function Login({saveUserId}) {
  const [UserData,setUserData] = useState(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  function inputData(){
    if(!usernameRef.current ||  passwordRef.current ){
      alert("enter value");
      return
    }
    
//fetch request here

    usernameRef.current.value = ""
    passwordRef.current.value = ""
  }
  return (
    <div className="flex flex-col gap-2 m-auto">
      <input
        ref={usernameRef}
        placeholder="Enter username:"
        className="bg-gray-300 rounded h-10 w-96"
      ></input>
      <input
        ref={passwordRef}
        placeholder="Enter password:"
        type="password"
        className="bg-gray-300 h-10 rounded"
      ></input>
      <button
        className="bg-red-100 rounded hover:bg-red-600"
        onClick={()=>inputData()}
      > Submit </button>
      <div className="bg-white">{UserData && <pre>{JSON.stringify(UserData, null, 2)}</pre>}</div>
    </div>
  );
}

export default Login;
