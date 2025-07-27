import express from "express";
import dotenv from "dotenv";
import authroutes from "./routes/authroutes.js"
import cookieParser from "cookie-parser";
import connectdb from "./config/db.js";
import messagerouter from "./routes/messagerouter.js";
import cors from "cors";
import { app, server } from "../socket/socket.js";
dotenv.config();
const port=process.env.PORT||4000;


app.get("/",(req,res)=>{
    res.send("<h1>welcome to chat app</h1>")
})
app.use(cors({
  origin: "http://localhost:5173", // your frontend origin
  credentials: true,               // allow cookies/token
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authroutes);
app.use("/api/message",messagerouter);

server.listen(port,()=>{
    console.log("listening to port",port);
    connectdb(); 
})


