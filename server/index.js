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

let count = 0;

io.on("connection", (socket) => {
  console.log("A User is connected");
  count++;

  io.emit("newuser", count);

  socket.on("message", (msg) => {
    socket.broadcast.emit("usermsg", msg);
  });

  socket.on("disconnect", function () {
    count--;
    console.log("User Disconnected", count);
    io.emit("newuser", count);
  });
});


server.listen(8000, async () => {
  
  console.log("listening on Port 8000");
});