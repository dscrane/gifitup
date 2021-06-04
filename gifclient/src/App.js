import React, { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { GameSpace } from "./components/GameSpace";
import { io } from "socket.io-client";


const App = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:5500")
    setSocket(socket);
  }, [])
  useEffect(() => {
    if (socket) {
      socket.on("welcome", ({socketId, room}) => console.log(socketId, room))
    }
  }, [socket])

  return (
    <div className="app">
      <div className="app__sidebar">
        <Sidebar socket={socket}/>
      </div>
      <div className="app__gamespace">
        <GameSpace />
      </div>
    </div>
  );
};

export default App;
