import { createServer } from "http";
import express  from "express";
import { Server } from "socket.io"
import { log } from "./utils/logs.js"

import { socketConfig } from "./config/socketConfig.js";

// Create express app
const app = express();

// Create http server to host express app and socket session
const httpServer = createServer(app);
// Initialize socket session
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
// Define port
const PORT = 5500 || process.env.PORT;


// app.get("/", (req, res) => {
//   console.log("endpoint hit");
//   res.send({ resp: "Hello World" });
// });

socketConfig(io);

httpServer.listen(PORT, () => {
  log.app(`Listening on localhost:${PORT}`);
});
