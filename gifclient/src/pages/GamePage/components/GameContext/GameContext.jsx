/* IMPORTS */
import React, { useEffect } from "react";
import { useSessionStore } from "../../../../store/store";
import socket from "../../../../config/socket";
import { Sidebar } from "../../../../components/Sidebar";
import { GameContainer } from "../GameContainer";
/* ------ */

export const GameContext = () => {
  const [
    session,
    players,
    thisPlayer,
    setThisPlayer,
    updateThisPlayer,
    fetchPlayerList,
    updatePlayerList,
    updateSession,
    removePlayer,
  ] = useSessionStore((state) => [
    state.session,
    state.players,
    state.thisPlayer,
    state.setThisPlayer,
    state.updateThisPlayer,
    state.fetchPlayerList,
    state.updatePlayerList,
    state.updateSession,
    state.removePlayer,
  ]);

  useEffect(() => {
    socket.on("connect", () => {
      console.info(
        `[SOCKET]: connection ${socket.id ? "successful" : "failed"}`
      );
    });
    socket.on("update-this-player", (socketId) => {
      console.info(`[SOCKET]: ${socketId} updated`);
      updateThisPlayer(socketId);
    });
    socket.on("room-created", ({ session }, { players }) => {
      console.info(`[SOCKET]: ${socket.id} created & joined ${session.roomId}`);
      updateSession({ ...session, inProgress: true });
      fetchPlayerList(players);
    });
    socket.on("player-list", (players) => {
      console.log("[SOCKET]: room contains these players: ", players);
      updatePlayerList(players);
    });
    socket.on("joined-room", async ({ thisPlayer }) => {
      console.log("[SOCKET]: ThisPlayer: ", thisPlayer);
      await updateSession({ inProgress: true });
      await updateThisPlayer(thisPlayer);
    });
    socket.on("player-joined", async ({ players }) => {
      console.log("[SOCKET]: player ", players[players.length - 1], " joined");
      await updatePlayerList(players);
    });

    // socket.on("player-left", ({ data }) => {
    //   console.log("[SOCKET]: player ", data, " left");
    //   removePlayer(data);
    // });
    // socket.on("game-begun", ({ data }) => {
    //   console.log("[SOCKET]: game begun");
    //   // fetch the gifs for the game
    //   // parse gifs into sets for players
    //
    //   updatePlayerList(data);
    // });

    return () => socket.disconnect();
  }, [
    updateSession,
    fetchPlayerList,
    removePlayer,
    setThisPlayer,
    updateThisPlayer,
    updatePlayerList,
  ]);
  return (
    <>
      <Sidebar />
      <GameContainer thisPlayer={thisPlayer} />
    </>
  );
};
