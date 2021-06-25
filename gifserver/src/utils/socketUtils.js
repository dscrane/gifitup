export const randomId = (prefix) => {
  let result = "";
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 32; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${prefix}_${result}`;
};

export const getSockets = (sockets) => {
  let connectedNames = [];
  for (const socket of sockets) {
    connectedNames.push({ socketId: socket.id, ...socket.data })
  }
  return connectedNames.length ? connectedNames : null;
}

export const createPlayerObject = (name, room, socketId, queryOffset) => ({
  socketId,
  queryOffset,
  roomId: room,
  playerId: randomId("P"),
  playerName: name,
  score: 0,
  isJudge: false,
  inGameRoom: false,
  isConnected: true
})

export const updatePlayerObjects = (currentPlayerObject, updates) => {
  return {
    ...currentPlayerObject,
    ...updates,
  }
}