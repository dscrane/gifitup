import socket from "../../config/socket";

const emitLog = (log, data) => console.info("[IO_em]: ", log, data || " ");

export const emitterStore = (set) => ({
  createSessionEmitter: async () => {
    emitLog("creating initial session...");
    await socket.emit("create-room");
  },
  joinSessionEmitter: async (name, roomId) => {
    emitLog("joining room... ", roomId, name);
    await socket.emit("join-room", name, roomId);
  },
  gifToTableEmitter: async (gifId) => {
    emitLog("moving gif...", gifId);
    await socket.emit("new-table-gif", gifId);
    await socket.emit("end-round");
  },
  updateScoreEmitter: async () => {
    emitLog("updating scores...");
    await socket.emit("update-scores");
  },
  endRoundEmitter: async (roomId) => {
    socket.emit("end-round", roomId);
  },
  changeJudgeEmitter: async () => {
    emitLog("passing judge role...");
    await socket.emit("pass-judge-role");
  },
  disconnectSessionEmitter: async (playerName, roomName) => {
    emitLog("leaving room...", roomName);
    await socket.emit("disconnect", playerName, roomName);
  },
  endSessionEmitter: async (roomName) => {
    emitLog("", "ending session...", roomName);
    await socket.emit("end-session", roomName);
  },
});
