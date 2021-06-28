import {log} from "../../utils/logs.js";

const disconnectController = (io, socket) => {
  if (JSON.stringify(socket.data) === "{}") {
    return;
  }
  log.socket(socket.id,'disconnecting socket', socket.data.roomId)
  io.to(socket.data.roomId).emit('player-left', socket.data.playerId, socket.data.playerName)
}

export { disconnectController }