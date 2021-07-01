import {getSockets} from "../../utils/socketUtils.js";

const passJudgeRoleController = async (io, socket) => {
  // Add relevant information to socket object
  const players = getSockets(await io.in(socket.data.roomId).fetchSockets());
  const randomPlayerIndex = Math.floor(Math.random() * players.length);
  const nextJudge = players[randomPlayerIndex].playerId
  console.log(nextJudge)
  io.to(socket.data.roomId).emit("player-is-judge", nextJudge)

}

export { passJudgeRoleController }