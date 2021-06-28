import { randomId, createPlayerObject, updatePlayerObjects, getSockets } from "../utils/socketUtils.js";
import {
  createRoomController,
  disconnectController,
  joinRoomController,
  newTableGifConroller
} from "../controllers/socketControllers/index.js";
import { log } from "../utils/logs.js"



export const socketConfig =  (io) => {
  io.on("connection", async socket => {
    log.socket(socket.id, `connected`)
    socket.on("create-room", async (room) => {
      await createRoomController(io, socket, room);
    })
    socket.on("join-room", async (name, roomId) => {
      await joinRoomController(io, socket, name, roomId)
    })
    socket.on('new-table-gif', async (gifId) => {
      await newTableGifConroller(io, socket, gifId)
    })
    socket.on("update-scores", async () => {

    })
    socket.on("pass-judge-role", async () => {

    })
    socket.on("end-session", async () => {

    })
    socket.on('disconnecting', () => {
      disconnectController(io, socket)
    })
  })
}
