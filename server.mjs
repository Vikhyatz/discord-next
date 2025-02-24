// server socket setup
import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("Client connected")

    // socket to connect the users to the roomname passed
    socket.on("joinRoom", (roomname) => {
      socket.join(roomname);
      socket.room = roomname;
      console.log(`the user is connected to the room name: ${roomname}`); // for direct messages this roomname will be generated by joining both the id's of the users
    })

    

    socket.on("chat message", (value, roomname, sender, date, time) => {
      console.log("this should be the room name strongly", socket.room);
      console.log(sender, "has sended the message" , value)
      // console.log(roomname, " is the roomname")

      io.to(roomname).emit('receive messsage', value, sender, date, time);
      // console.log(value)
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });


  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});