import chalk from "chalk";
import uniqueId from "lodash.uniqueid";


export const socketConfig = (io) => {
  io.socketsLeave("testRoom")
  io.disconnectSockets(true)
  io.on("connection", socket => {
    console.log(`${chalk.yellow('[SOCKET]:')} connection`)
    socket.emit('initial-connection', {
      data: {
        socketId: socket.id
      }
  })
    socket.on("join-room", () => {
      const roomId = uniqueId();
      socket.join(roomId);
      socket.data.room = roomId;
      socket.emit('joined-room', {
        data: {
          ...socket.data,
        }
      })
    })



    socket.on("new-player", ({name}) => {
      console.log(`${chalk.yellow('[SOCKET]:')} ${name}`)
      socket.data.username = name;
      console.log(socket.data)
    })

  })
}