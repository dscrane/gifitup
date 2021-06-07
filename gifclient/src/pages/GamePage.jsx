import React, { useEffect } from "react";
import { usePlayers, useSession } from "../store/store";
import { io } from "socket.io-client";
import { Sidebar } from "../components/Sidebar";
import { GameSpace } from "../components/GameSpace";

export const GamePage = () => {
  const [players, addPlayer] = usePlayers((state) => [
    state.players,
    state.addPlayer,
  ]);
  const [session, updateSessionData, updateSocket] = useSession((state) => [
    state.session,
    state.updateSessionData,
    state.updateSocket,
  ]);

  console.log(players, session);
  useEffect(() => {
    const connectToSocket = async () => {
      console.log("trying to connect");
      const socket = io("http://localhost:5500");
      console.log("socket", socket);
      await updateSocket(socket);
      socket.on("initial-connection", ({ data }) => {
        console.log("eventData", data);
        updateSessionData(data);
      });
    };
    connectToSocket();
  }, []);
  useEffect(() => {
    if (session.socketIO) {
      session.socketIO.on("joined-room", ({ data }) => console.log(...data));
    }
  }, [session.socketIO]);

  return (
    <>
      <div className="app__sidebar">
        <Sidebar socketIO={session.socketIO} />
      </div>
      <div className="app__gamespace">
        <GameSpace />
      </div>
    </>
  );
};
