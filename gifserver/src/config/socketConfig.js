import chalk from "chalk";

export const socketConfig =  (io) => {
  io.disconnectSockets(true)
  io.on("connection", async socket => {
    console.log(`${chalk.yellow('[SOCKET]:')} ${socket.id} has connected`);
    // Initialize new player and add them to the game room
    socket.on("new-player", ({name}) => {
      console.log(`${chalk.yellow('[SOCKET]:')} ${name}`)
      socket.data.username = name;
      socket.join("testRoom");
      socket.data.room = "testRoom";
      socket.emit("welcome", socket.data)
      console.log(socket.data)
    })

  })
}