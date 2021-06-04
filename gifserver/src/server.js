import { createServer } from "http";
import express  from "express";
import { Server } from "socket.io"
import chalk from "chalk";

import { socketConfig } from "./config/socketConfig.js";

// Create express app
const app = express();
// Create http server to host express app and socket session
const httpServer = createServer(function(req,res){
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if ( req.method === 'OPTIONS' ) {
    res.writeHead(200);
    res.end();
    return;
  }
}, app);
// Initialize socket session
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
// Define port
const PORT = 5500 || process.env.PORT;


app.get("/", (req, res) => {
  console.log("endpoint hit");
  res.send({ resp: "Hello World" });
});

socketConfig(io);

httpServer.listen(PORT, () => {
  console.log(`${chalk.gray('[APP]:')} Listening on localhost:${PORT}`);
});
