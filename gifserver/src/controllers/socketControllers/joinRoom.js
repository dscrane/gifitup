import {createPlayerObject, getSockets} from "../../utils/socketUtils.js";
import {log} from "../../utils/logs.js";

const joinRoomController = async (io, socket, name, roomId) => {
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
  log.room(roomId, "contains", io.of('/').adapter.rooms.get(roomId))
  // Define the player on the local machine
  const localPlayer = {...socket.data};
  socket.emit('set-local-player', localPlayer)
  // Collect player objects of connected sockets
  // if player is alone in room return array of "localPlayer"
  const connectedPlayers = players ? [localPlayer, ...players] : [ localPlayer ]
  // Emit event to update client state
  console.log('join room ran', connectedPlayers)
  io.to(roomId).emit('player-joined', connectedPlayers)
}

export { joinRoomController };