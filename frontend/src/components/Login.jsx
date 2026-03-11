import { useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "../utils/constants";



const Login = () => {
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const [emailId, setEmailId] = useState("udit@gmail.com");
  const [password , setPassword] = useState("Udit@123");
  const handleLogin  = async ()=>{
    try{

      const res = await axios.post(BASE_URL+ "/login" , {
       emailID: emailId,
    password: password

      },{
        withCredentials:true
      })
      dispatch(addUser(res.data));
      return navigate("/");
     // console.log(res);
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
