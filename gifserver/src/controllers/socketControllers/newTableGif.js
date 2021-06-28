const newTableGifConroller = (io, socket, gifId) => {
  io.to(socket.data.roomId).emit("add-gif", gifId)
}

export { newTableGifConroller }