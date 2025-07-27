import './App.css'
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Homepage from './pages/Homepage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import {useSelector,useDispatch} from "react-redux";
import io from "socket.io-client";
import { setSocket } from './redux/socketslice';
import { setOnlineUsers } from './redux/userslice';
import { BASE_URL } from './config';

function App() {
  const {authUser} = useSelector(store=>store.user);
  console.log("authUser:", authUser);
  const {socket} = useSelector(store=>store.socket);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(authUser){
      const socketio = io(BASE_URL, {
          query:{
            userId:authUser._id
          }
      });
      console.log("Socket connecting to", BASE_URL);
      dispatch(setSocket(socketio));

      socketio?.on('getOnlineUsers', (onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      });
      return () => socketio.close();  //cleanup
    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }

  },[authUser]);
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Homepage/>} />
      </Routes>
    </div>
  )
}

export default App
