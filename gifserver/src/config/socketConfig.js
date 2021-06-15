import { randomId, createPlayerObject, updatePlayerObjects, getSockets } from "../utils/socketUtils.js";
import { log } from "../utils/logs.js"



export const socketConfig =  (io) => {
  io.socketsLeave("testRoom")
  io.disconnectSockets(true)
  io.on("connection", async socket => {
    log.socket(socket.id, `connected`)
    socket.emit("connection-success", socket.id)

    socket.on("fetch-players", async (roomId, callback) => {
      const players = getSockets(await io.in(roomId).fetchSockets())
      callback('fetching players....')
      socket.emit("player-list", players)
    })

    socket.on("create-room", async (name, callback) => {
      // Create random roomId
      const roomId = randomId("R");
      log.socket(roomId,` has been created`)
      // Add relevant information to socket object
      socket.data = { ...createPlayerObject(name, roomId, socket.id, true) }
      socket.data.queryOffset = 0;
      socket.emit('update-this-player', {thisPlayer: {...socket.data, }})

      // Join newly created room and send acknowledgement
      await socket.join(roomId);
      log.socket(socket.id, `has joined room`, roomId)
      callback(`${roomId} created`)

      // Collect player objects of connected sockets
      const players = getSockets(await io.in(roomId).fetchSockets())
      // Emit event to update client state
      io.to(roomId).emit('room-created',
        {session: {roomId}},
        {players: players},
      )
    })
    socket.on("join-room", async (name, roomId, callback) => {
       // Add relevant information to socket object
      socket.data = {...createPlayerObject(name, roomId, socket.id)}


      // Join newly created room and send acknowledgement
      await socket.join(roomId);
      log.socket(socket.id, `has joined room`, roomId)
      callback(`${roomId} created`)

      const players = getSockets(await io.in(roomId).fetchSockets());
      socket.data.queryOffset = (players.length - 1) * 7;


      socket.emit('update-this-player', {thisPlayer: {...socket.data, }})
      // Collect player objects of connected sockets
      socket.emit('playerList', { players: players }, )
      // Emit event to update client state
      io.to(roomId).emit('player-joined', { players: players })
    })
    socket.on("begin-game", async (status) => {
      const players = getSockets(await io.in(socket.data.roomId).fetchSockets());
      const updatedPlayers = players.map(player => ({ ...player.data, inProgress: status }))

      io.to(socket.data.roomId).emit("game-begun", { players: updatedPlayers })
    })
  })
}
