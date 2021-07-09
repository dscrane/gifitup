import socket from "../../config/socket";
import { log } from "../../utils/logs";

export const emitterStore = (set) => ({
  createSessionEmitter: async () => {
    log.emit("creating initial session...");
    socket.emit("create-room", null, (ack) => log.ack(ack));
  },
  joinSessionEmitter: async (name, roomId) => {
    log.emit("joining room... ");
    await socket.emit("join-room", name, roomId, (ack) => log.ack(ack));
  },
  fetchPlayerNamesEmitter: async (roomId) => {
    log.emit("fetching players in room...");
    await socket.emit("fetch-player-names", roomId, (ack) => log.ack(ack));
  },
  gifToTableEmitter: async (gifId) => {
    log.emit("moving gif...");
    await socket.emit("new-table-gif", gifId, (ack) => log.ack(ack));
  },
  updateScoreEmitter: async () => {
    log.emit("updating scores...");
    await socket.emit("update-scores", (ack) => log.ack(ack));
  },
  endRoundEmitter: async (roomId) => {
    socket.emit("end-round", roomId, (ack) => log.ack(ack));
  },
  changeJudgeEmitter: async () => {
    log.emit("passing judge role...");
    await socket.emit("pass-judge-role");
  },
  disconnectSessionEmitter: async (playerName, roomName) => {
    log.emit("leaving room...");
    await socket.emit("disconnect", playerName, roomName);
  },
  endSessionEmitter: async (roomName) => {
    log.emit("", "ending session...");
    await socket.emit("end-session", roomName);
  },
});
