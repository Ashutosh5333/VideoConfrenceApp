const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("Hello welcome");
});





const io = new Server(server);

// socket connection


io.on("connection", (socket) => {

  const emailTosocketmap = new Map();

    // joined user 
  socket.on("join-room", (data) =>{
      const {roomId ,emailId} = data;
      console.log("user", emailId , "Joinned Room", roomId )
      emailTosocketmap.set(emailId, socket.id)  
      socket.join(roomId)
      socket.broadcast.to(roomId).emit("user-joined", {emailId});
    })
  

  socket.on("disconnect", function () {
  
    console.log("User Disconnected");
  });


});


server.listen(8000, async () => {
  
  console.log("listening on Port 8000");
});