import { useState } from "react";
import axios from 'axios';


const Login = () => {
  const [emailId, setEmailId] = useState("udit@gmail.com");
  const [password , setPassword] = useState("Udit@123");
  const handleLogin  = async ()=>{
    try{

      const res = await axios.post("http://localhost:3000/login" , {
       emailID: emailId,
    password: password

      },{
        withCredentials:true
      })
    }catch(err){
      console.error(err);
    }

  }
  return (
    <div>
 <div className="flex justify-center items-center min-h-screen bg-base-200">
  <div className="card bg-base-100 w-96 shadow-xl">
    <div className="card-body">

      <h2 className="card-title justify-center text-2xl font-bold">
        Login
      </h2>

      <label className="form-control w-full my-2">
        <div className="label">
          <span className="label-text">Email ID</span>
        </div>
        <input
          type="text"
          value={emailId}
          className="input input-bordered w-full"
          onChange={(e) => setEmailId(e.target.value)}
        />
      </label>

      <label className="form-control w-full my-2">
        <div className="label">
          <span className="label-text">Password</span>
        </div>
        <input
          type="password"
          value={password}
          className="input input-bordered w-full"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <div className="card-actions justify-center mt-4">
        <button className="btn btn-primary w-full" onClick={handleLogin}>
          Login
        </button>
      </div>

    </div>
  </div>
</div>
    </div>
  );
};

export default Login;
