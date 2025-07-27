import {Server} from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";

const app = express();
console.log("hi");
const server = http.createServer(app);
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
const io = new Server(server, {
    cors:{
        origin:['http://localhost:5173'],
        methods:['GET', 'POST'],
    },
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

const userSocketMap = {}; // {userId->socketId}


io.on('connection', (socket)=>{
    console.log("connection established");
    const userId = socket.handshake.query.userId
    if(userId !== undefined){
        userSocketMap[userId] = socket.id;
    } 

    io.emit('getOnlineUsers',Object.keys(userSocketMap));

    socket.on('disconnect', ()=>{
        delete userSocketMap[userId];
        io.emit('getOnlineUsers',Object.keys(userSocketMap));
    })

})

export {app, io, server};

