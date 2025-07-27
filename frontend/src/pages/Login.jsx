import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userslice.js'; // ✅ Add this


const Login = () => {
  console.log("Login component rendered");
  const [user, setUser] = useState({
    email:"",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
  const message = error?.response?.data?.message || "Login failed";
  toast.error(message);
  console.log("Signup error:", error.response?.data);
}
    setUser({
      email: "",
      password: "",
    })
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
    <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
      <h1 className='text-3xl font-bold text-center'>Login</h1>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label className='label p-2'>
            <span className='text-base label-text'>Email</span>
          </label>
          <input
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className='w-full input input-bordered h-10'
            type="email"
            placeholder='Email' />
        </div>
        <div>
          <label className='label p-2'>
            <span className='text-base label-text'>Password</span>
          </label>
          <input
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className='w-full input input-bordered h-10'
            type="password"
            placeholder='Password' />
        </div>
        <p className='text-center my-2'>Dont have an account? <Link to="/signup">Signup</Link></p>
        <div>
          <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700'>Login</button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Login;