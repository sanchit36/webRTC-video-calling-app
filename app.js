const express = require("express");
const http = require("http");
const socket = require("socket.io");

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

let connectedPeers = [];

io.on("connection", (socket) => {
  connectedPeers.push(socket.id);
  console.log("Users: ", connectedPeers);

  socket.on("disconnect", () => {
    console.log("User disconnected");

    connectedPeers.splice(
      connectedPeers.find((p) => p.id === socket.id),
      1
    );

    console.log("Users: ", connectedPeers);
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
