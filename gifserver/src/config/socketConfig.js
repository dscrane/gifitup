import { randomId } from "../utils/utilities.js";
import { log } from "../utils/logs.js"

const getSocketNames = (sockets) => {
  let connectedNames = [];
  for (const socket of sockets) {
   connectedNames.push(socket.nickname)
  }
  return connectedNames;
}

export const socketConfig =  (io) => {
  io.socketsLeave("testRoom")
  io.disconnectSockets(true)
  io.on("connection", async socket => {
    log.socket(`${socket.id} initial connect`)
    // const roomId = 'test'
    // log.socket(`${socket.id} has connected`)
    // await socket.join('test')
    //
    // socket.data.room = roomId


    // socket.broadcast.emit('update-connections', socket.id)
    // socket.on('check-connections', async (room) => {
    //   const connections = await io.in(room).allSockets();
    //   socket.data.connections = connections
    //   socket.emit('update-connections', { data: { ...socket.data}})
    // })
    socket.on("create-room", async (name, callback) => {
      // Create random roomId
      const roomId = randomId("r");
      log.socket(`Room ${roomId} has been created`)
      // Add relevant information to socket object
      socket.data.room = roomId;
      socket.nickname = name;
      // Join newly created room
      await socket.join(roomId);
      log.socket(`${socket.id} has joined room ${roomId}`)
      callback(`${roomId} created`)
      const playerNames =  getSocketNames(await io.in(roomId).fetchSockets());
      socket.emit('room-created',
        {session: {roomId}},
        {playerNames: {playerNames}}
        )

    })


    socket.on("join-room", async (name, roomId, callback) => {
      console.log(roomId, name)

      socket.data.room = roomId;
      socket.nickname = name;
      socket.join(roomId)
      const playerNames =  getSocketNames(await io.in(roomId).fetchSockets());
      callback(`${name} has joined ${roomId}`)
      console.log(playerNames)
      io/*.to('roomId').*/.emit('room-created',
        {session: {roomId}},
        {playerNames: {playerNames}}
      )
    })
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


    // // console.log(`${chalk.yellow('[SOCKET]:')}`, io)

  })
}
