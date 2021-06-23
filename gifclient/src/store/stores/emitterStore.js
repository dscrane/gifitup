import socket from "../../config/socket";

export const emitterStore = (set) => ({
  fetchPlayersEmitter: async (roomId) => {
    console.info("[IO_em]: fetching players in... ", roomId);
    await socket.emit("fetch-players", roomId, (data) => console.info(data));
  },
  createSessionEmitter: async (roomId) => {
    console.info("[IO_em]: creating session... ", roomId || "initially");
    await socket.emit("create-room", roomId);
  },
  joinSessionEmitter: async (name, roomId) => {
    console.info("[IO_em]: joining room... ", roomId);
    await socket.emit("join-room", name, roomId);
  },
  gifToTableEmitter: async (gifId) => {
    console.info("[IO_em]: moving gif...", gifId);
    await socket.emit("new-table-gif", gifId);
  },
  disconnectSessionEmitter: async (playerName, roomName) => {
    console.info("[IO_em]: leaving room...", roomName);
    await socket.emit("disconnect", playerName, roomName);
  },
  endSessionEmitter: async (roomName) => {
    console.info("[IO_em]: ", "ending session...", roomName);
    await socket.emit("end-session", roomName);
  },
});
