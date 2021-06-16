/* IMPORTS */
import React, { useEffect } from "react";
import { useSessionStore } from "../../../../store/store";
import socket from "../../../../config/socket";
import { Sidebar } from "../../../../components/Sidebar";
import { GameContainer } from "../GameContainer";
/* ------ */

export const GameContext = () => {
  // const [fetchFromGiphy] = useSessionStore((state) => [state.fetchFromGiphy]);
  const [
    session,
    players,
    thisPlayer,
    fetchFromGiphy,
    setThisPlayer,
    updateThisPlayer,
    fetchPlayerList,
    updatePlayerList,
    updateSession,
    removePlayer,
    toggleFetchFromGiphy,
  ] = useSessionStore((state) => [
    state.session,
    state.players,
    state.thisPlayer,
    state.fetchFromGiphy,
    state.setThisPlayer,
    state.updateThisPlayer,
    state.fetchPlayerList,
    state.updatePlayerList,
    state.updateSession,
    state.removePlayer,
    state.toggleFetchFromGiphy,
  ]);

  useEffect(() => {
    socket.on("room-created", async ({ data }) => {
      console.info(`[SOCKET]: created `, data);
      updateSession(data);
      // console.log(data.session);
      // console.log(!session.fetchFromGiphy);
      // await updateSession(data.session);
      // await fetchPlayerList(data.players);
      // await toggleFetchFromGiphy(true);
    });
    if (session.initialized) {
      socket.on("update-this-player", ({ thisPlayer }) => {
        console.info(`[SOCKET]: updated`, thisPlayer);
        setThisPlayer(thisPlayer);
      });

      socket.on("player-list", (players) => {
        console.log("[SOCKET]: room contains these players: ", players);
        updatePlayerList(players);
      });
      socket.on("joined-room", async ({ thisPlayer }) => {
        console.log("[SOCKET]: ThisPlayer: ", thisPlayer);
        await updateSession({ inGameSession: true });
        await setThisPlayer(thisPlayer);
        // await toggleFetchFromGiphy(true);
      });
      socket.on("player-joined", async ({ players }) => {
        console.log(
          "[SOCKET]: player ",
          players[players.length - 1],
          " joined"
        );
        await updatePlayerList(players);
      });

      return () => socket.disconnect();
    }
  }, [
    session.initialized,
    updateSession,
    fetchPlayerList,
    removePlayer,
    setThisPlayer,
    updateThisPlayer,
    updatePlayerList,
    toggleFetchFromGiphy,
    fetchFromGiphy,
  ]);
  return (
    <>
      <Sidebar />
      <GameContainer />
    </>
  );
};
