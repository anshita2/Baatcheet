import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const res = await axios.post("https://baatcheet-backe.onrender.com/api/auth/signup", user, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
  const message = error?.response?.data?.message || "Signup failed";
  toast.error(message);
  console.log("Signup error:", error.response?.data);
}
    setUser({
      fullname: "",
      email: "",
      password: "",
    })
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
    <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
      <h1 className='text-3xl font-bold text-center'>Signup</h1>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label className='label p-2'>
            <span className='text-base label-text'>Full Name</span>
          </label>
          <input
            value={user.fullname}
            onChange={(e) => setUser({ ...user, fullname: e.target.value })}
            className='w-full input input-bordered h-10'
            type="text"
            placeholder='Full Name' />
        </div>
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
        <p className='text-center my-2'>Already have an account? <Link to="/login">Login</Link></p>
        <div>
          <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700'>Signup</button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Signup