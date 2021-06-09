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
  const [session, updateCurrentPlayers, updateSession] = useStore((state) => [
    state.session,
    state.updateCurrentPlayers,
    state.updateSession,
  ]);

  socket.on("connect", () =>
    console.info(
      "[SOCKET]: ",
      `connection ${socket.id ? "successful" : "failed"}`
    )
  );
  socket.on("room-created", ({ session }, { playerNames }) => {
    console.info("[SOCKET]: created and joined ", session, " room");
    updateSession(session);
    updateCurrentPlayers(playerNames);
  });

  socket.on("initial-connection", ({ data }) => {
    console.log("SOCKET", data);
  });

  socket.on("player-joined", ({ data }) => {
    console.log("playerJoined", data);
    updateCurrentPlayers(data);
  });

  return (
    <>
      <div className="app__sidebar">
        <Sidebar />
      </div>
      <div className="app__gamespace">
        <GameSpace />
      </div>
    </>
  );
};
