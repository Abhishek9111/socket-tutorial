const express = require("express");
const path = require("path");
const http = require("http");
const app = express();

const server = http.createServer(app);

const { Server } = require("socket.io");
app.use(express.static(path.resolve("./public")));
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a new user has connected", socket.id);
  socket.on("user-message", (message) => {
    console.log("FE message", message);
    io.emit("message", message);
  });
});

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});
server.listen(9000, () => {
  console.log("server running");
});
