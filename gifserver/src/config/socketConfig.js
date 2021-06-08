
import uniqueId from "lodash.uniqueid";
import {log} from "../utils/logs.js"

const getAllConnections = (connections) => {
  let connectedSockets = []
  const setIter = connections.entries();
  for (const entry of setIter) {
    connectedSockets.push(entry[0])
  }
  return connectedSockets;
}

export const socketConfig =  (io) => {
  io.socketsLeave("testRoom")
  io.disconnectSockets(true)
  io.on("connection", async socket => {
    const roomId = 'test'
    log.socket(`${socket.id} has connected`)
    await socket.join('test')

    socket.data.room = roomId
    const connections = await io.in(roomId).allSockets();
    const socketsInRoom = getAllConnections(connections).filter(connection => connection !== socket.id)
    socket.emit('initial-connection', {
      data: {
        socketsInRoom,
        socketId: socket.id,
      }
    })
    socket.broadcast.emit('update-connections', socket.id)
    socket.on('check-connections', async (room) => {
      const connections = await io.in(room).allSockets();
      socket.data.connections = connections
      socket.emit('update-connections', { data: { ...socket.data}})
    })

    // socket.on("join-room", (name, callback) => {
    //   const roomId = uniqueId();
    //   console.log(roomId)
    //   socket.data.room = roomId;
    //   socket.nickname = name;
    //   socket.join(roomId);
    //   log.socket(`${socket.id} has joined room ${roomId}`)
    //   console.log(socket)
    //
    //
    //
    //   socket.data.connections = io.of('test').sockets.size;
    //   io.emit('joined-room', {
    //     data: {
    //       ...socket.data,
    //     }
    //   })
    //   callback({ status: "ok" })
    // })

  })

  // // console.log(`${chalk.yellow('[SOCKET]:')}`, io)

}
