import { io } from "socket.io-client";
const socket =
  process.env.NODE_ENV === "production" ? io() : io("http://localhost:5500", { forceNew: true });

export default socket;