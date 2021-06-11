/* IMPORTS */
import React, { useEffect } from "react";
import { useGameStore } from "../../../../store/store";
import socket from "../../../../config/socket";
import { Sidebar } from "../../../../components/Sidebar";
import { GameContainer } from "../GameContainer";
/* ------ */

export const GameContext = () => {
  const [
    session,
    players,
    fetchPlayerList,
    updatePlayerList,
    updateSession,
    removePlayer,
  ] = useGameStore((state) => [
    state.session,
    state.players,
    state.fetchPlayerList,
    state.updateSession,
    state.removePlayer,
  ]);

  useEffect(() => {
    socket.on("connect", () =>
      console.info(
        `[SOCKET]: connection ${socket.id ? "successful" : "failed"}`
      )
    );

    socket.on("room-created", ({ session }, { players }) => {
      console.info(
        `[SOCKET]: ${socket.id} created and joined ${session.roomId} room`
      );
      updateSession(session);
      fetchPlayerList(players);
    });

    socket.on("player-joined", ({ players }) => {
      console.log("[SOCKET]: player ", players, " joined");
      fetchPlayerList(players);
    });

    socket.on("player-left", ({ data }) => {
      console.log("[SOCKET]: player ", data, " left");
      removePlayer(data);
    });

    socket.on("game-begun", ({ data }) => {
      console.log("[SOCKET]: game begun");
      updatePlayerList(data);
    });

    return () => socket.disconnect();
  }, [updateSession, fetchPlayerList, removePlayer]);

  return (
    <>
      <div className="app__sidebar">
        <Sidebar />
      </div>
      <div className="app__gamespace">
        <GameContainer />
      </div>
    </>
  );
};
