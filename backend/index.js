
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000;

io.on("connection", (socket) => {
  console.log("a user connected :D");

  socket.on("chat message", (data) => {
   
    socket.join(data.RoomId); // We are using room of socket io
    io.sockets.in(data.RoomId).emit('chat message', {msg: data.msg,RoomId:data.RoomId,customId : socket.id,key:'server'});

    console.log("socket id",socket.id , "senderid",data)
    //console.log(socket.sessionId);
  });


});

server.listen(port, () => console.log("server running on port:" + port));
