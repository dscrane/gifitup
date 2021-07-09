import {randomId, createPlayerObject, updatePlayerObjects, getSockets, getPlayerNames} from "../utils/socketUtils.js";
import {
  createRoomController,
  disconnectController,
  passJudgeRoleController,
  // endRoundController,
  joinRoomController,
  newTableGifConroller
} from '../controllers/socketControllers/index.js';
import { log } from "../utils/logs.js"



export const socketConfig =  (io) => {
  io.on("connection", async socket => {
    log.socket(socket.id, `connected`)
    socket.on("create-room", async (room) => {
      await createRoomController(io, socket, room);
    })
    socket.on("join-room", async (name, roomId) => {
      console.log('join room ran')
      await joinRoomController(io, socket, name, roomId)
    })
    socket.on("fetch-players", async (roomId) => {
      console.log('fetch players ran')
      const players = getPlayerNames(await io.in(roomId).fetchSockets());
      socket.emit("player-list", players)
    })
    socket.on('new-table-gif', async (gifId) => {
      await newTableGifConroller(io, socket, gifId)
    })
    socket.on("update-scores", async () => {

    })
    socket.on("pass-judge-role", async () => {
      await passJudgeRoleController(io, socket)
    })
    socket.on("end-round", async (roomId) => {
      console.log(roomId)
      // await endRoundController(io, socket)
    })
    socket.on("end-session", async () => {

    })
    socket.on('disconnecting', () => {
      disconnectController(io, socket)
    })
  })
}
