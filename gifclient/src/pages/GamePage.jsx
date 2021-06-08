import React, { useEffect } from "react";
import { useStore } from "../store/store";
import socket from "../config/socket";
import { Sidebar } from "../components/Sidebar";
import { GameSpace } from "../components/GameSpace";

export const GamePage = () => {
  const [players, addPlayer] = useStore((state) => [
    state.players,
    state.addPlayer,
  ]);
  const [session, checkConnections] = useStore((state) => [
    state.session,
    state.updateSessionData,
    state.updateSocket,
  ]);

  console.log(players, session);
  // useEffect(() => {
  //   socket.on("initial-connection", ({ data }) => {
  //     console.log("eventData", data);
  //     updateSessionData(data);
  //   });
  // }, []);
  useEffect(() => {
    checkConnections();
  }, [socket]);

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
