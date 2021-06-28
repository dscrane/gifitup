import {randomId} from "../../utils/socketUtils.js";
import {log} from "../../utils/logs.js";

const createRoomController = async (io, socket, room) => {
// Create random roomId
  const roomId = room ? room : randomId("R");
  log.socket('',`creating room...`, roomId);
  // Emit event to update client state
  socket.emit('room-created', roomId)
}

export { createRoomController };