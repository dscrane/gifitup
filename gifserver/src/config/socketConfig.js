import { randomId, createPlayerObject, updatePlayerObjects, getSockets } from "../utils/socketUtils.js";
import { log } from "../utils/logs.js"



export const socketConfig =  (io) => {
  io.on("connection", async socket => {
    log.socket(socket.id, `connected`)
    socket.on("create-room", async (room) => {
      // Create random roomId
      const roomId = room ? room : randomId("R");
      log.socket('',`creating room...`, roomId);
      // Emit event to update client state
      socket.emit('room-created', roomId)
    })
    socket.on("join-room", async (name, roomId) => {
       // Add relevant information to socket object
      const players = getSockets(await io.in(roomId).fetchSockets());
      // Set the query offset based on position in list of players
      const queryOffset = players ? players.length * 7 : 0;
      // Create the new players object
      socket.data = {...createPlayerObject(name, roomId, socket.id, queryOffset)}
      socket.username = name;
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
      io.to(roomId).emit('player-joined', connectedPlayers, name)
    })
    socket.on("begin-game", async (status) => {
      const players = getSockets(await io.in(socket.data.roomId).fetchSockets());
      const updatedPlayers = players.map(player => ({ ...player.data, inProgress: status }))

      io.to(socket.data.roomId).emit("game-begun", { players: updatedPlayers })
    })
    socket.on('new-table-gif', async (gifId) => {
      io.to(socket.data.roomId).emit("add-gif", gifId)
    })
    socket.on('disconnecting', () => {
      if (JSON.stringify(socket.data) === "{}") {
        return;
      }
      log.socket(socket.id,'disconnecting socket', socket.data.roomId)
      io.to(socket.data.roomId).emit('player-left', socket.data.playerId, socket.data.playerName)
    })
  })
}
