import express from "express";
import socketIO from "socket.io";
import { createServer } from "http";
import { config } from "dotenv";

config();

const PORT = process.env.PORT;

const app = express();
const server = createServer(app);
const io = socketIO(server);
let players: any = [];

let magicNumber = 0;

app.get("/", (_, res) => {
  res.send("hello fellows");
});

io.on("connection", socket => {
  console.log("new connection");
  socket.emit("event::hello");

  socket.on("event::initialize", payload => {
    if (players.length >= 2) {
      socket.emit("event::gameFull");
      return;
    }

    players.push(payload);
    console.log("new name received: ", payload.nickname);
    io.emit("event::connected");

    if (players.length === 2) {
      io.emit("event::gameStarted");
      magicNumber = Math.floor(Math.random()*10);
    }
  });

  socket.on("event::magicNumber", payload => {
    let state = "";
    let player = payload.nickname;
      if (payload.number > magicNumber) {
        state = "lower"
      }
      else if (payload.number < magicNumber) {
        state = "higher"
      }
      else if (payload.number = magicNumber) {
        state = "win"
      }
     socket.emit("event::magicNumberState", { state,player })
    })
});

server.listen(PORT, () => {
  console.log(`Server ready at ... ${PORT}`);
});
