import {randomId, createPlayerObject, updatePlayerObjects, getSockets, getPlayerNames} from "../utils/socketUtils.js";
import {
  createRoomController,
  disconnectController,
  passJudgeRoleController,
  // endRoundController,
  joinRoomController,
  newTableGifController
} from '../controllers/socketControllers/index.js';
import { log } from "../utils/logs.js"



export const socketConfig =  (io) => {
  io.on("connection", async socket => {
    log.socket(socket.id, `connected`)
    socket.on("create-room", async (room, cb) => {
      await createRoomController(io, socket, room);
      cb("%ccreate-room complete");
    })
    socket.on("join-room", async (name, roomId, cb) => {
      await joinRoomController(io, socket, name, roomId)
      cb("%cjoin-room complete");
    })
    socket.on("fetch-player-names", async (roomId, cb) => {
      const playerNames = getPlayerNames(await io.in(roomId).fetchSockets());
      socket.emit("player-list", playerNames)
      cb("%cfetch-player-names complete");
    })
    socket.on('new-table-gif', async (gifId, cb) => {
      await newTableGifController(io, socket, gifId)
      cb("%cnew-table-gif complete");
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
