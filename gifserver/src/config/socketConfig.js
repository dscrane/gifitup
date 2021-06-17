import { randomId, createPlayerObject, updatePlayerObjects, getSockets } from "../utils/socketUtils.js";
import { log } from "../utils/logs.js"



export const socketConfig =  (io) => {
  io.socketsLeave("testRoom")
  io.disconnectSockets(true)
  io.on("connection", async socket => {
    log.socket(socket.id, `connected`)

    socket.on("fetch-players", async (roomId, callback) => {
      const players = getSockets(await io.in(roomId).fetchSockets())
      callback("[FETCH_PLAYERS_ACK]: fetching players....")
      socket.emit("player-list", players)
    })
    socket.on("create-room", async (room) => {
      // Create random roomId
      const roomId = room ? room : randomId("R");
      log.socket(roomId,` has been created`);
      // Emit event to update client state
      socket.emit('room-created', roomId)
      // not needed at this time
      // Add relevant information to socket object
      // socket.data = { ...createPlayerObject(name, roomId, socket.id, true) }
      // socket.data.queryOffset = 0;
      // socket.emit('update-this-player', {thisPlayer: {...socket.data, }})
      //
      // Join newly created room and send acknowledgement
      // await socket.join(roomId);
      // log.socket(socket.id, `has joined room`, roomId)
      // callback(`[CREATE_SESSION_ACK]: ${roomId} created`)
      //
      // Collect player objects of connected sockets
      // const players = getSockets(await io.in(roomId).fetchSockets())
    })
    socket.on("join-room", async (name, roomId) => {
       // Add relevant information to socket object
      const players = getSockets(await io.in(roomId).fetchSockets());
      // Set the query offset based on position in list of players
      const queryOffset = players ? players.length * 7 : 0;
      // Create the new players object
      socket.data = {...createPlayerObject(name, roomId, socket.id, queryOffset)}
      // Join newly created room and send acknowledgement
      await socket.join(roomId);
      log.socket(socket.id, `has joined room`, roomId)
      // Define the player on the local machine
      const localPlayer = {...socket.data};
      socket.emit('set-local-player', localPlayer)
      // Collect player objects of connected sockets
        // if player is alone in room return array of "localPlayer"
      const connectedPlayers = players ? [localPlayer, ...players] : [ {...localPlayer } ]
      socket.emit('player-list', connectedPlayers)
      // Emit event to update client state
      io.to(roomId).emit('player-joined', connectedPlayers)
    })
    socket.on("begin-game", async (status) => {
      const players = getSockets(await io.in(socket.data.roomId).fetchSockets());
      const updatedPlayers = players.map(player => ({ ...player.data, inProgress: status }))

      io.to(socket.data.roomId).emit("game-begun", { players: updatedPlayers })
    })
  })
}
