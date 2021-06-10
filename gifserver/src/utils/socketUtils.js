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
  return connectedNames;
}

export const createPlayerObject = (name, room, isHost=false) => ({
  isHost,
  roomId: room,
  playerId: randomId("P"),
  playerName: name

})