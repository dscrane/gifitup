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
    localPlayer,
    fetchFromGiphy,
    setLocalPlayer,
    updateLocalPlayer,
    fetchPlayerList,
    updatePlayerList,
    updateSession,
    removePlayer,
    toggleFetchFromGiphy,
  ] = useSessionStore((state) => [
    state.session,
    state.players,
    state.localPlayer,
    state.fetchFromGiphy,
    state.setLocalPlayer,
    state.updateLocalPlayer,
    state.fetchPlayerList,
    state.updatePlayerList,
    state.updateSession,
    state.removePlayer,
    state.toggleFetchFromGiphy,
  ]);

  useEffect(() => {
    socket.on("room-created", async (roomId) => {
      console.info("[IO]: created", roomId);
      updateSession({ roomId });
    });
    if (session.initialized) {
      socket.on("set-local-player", (localPlayer) => {
        console.info("[IO]: local player...", localPlayer.playerName);
        setLocalPlayer(localPlayer);
      });
      socket.on("update-local-player", (localPlayer) => {
        console.info("[IO]: updated local player...", localPlayer.playerName);
        updateLocalPlayer(localPlayer);
      });
      socket.on("player-list", (players) => {
        console.info("[IO]: current players...", players);
        updatePlayerList(players);
      });
      socket.on("player-joined", async (players) => {
        console.info(
          "[IO]: player joined...",
          players[players.length - 1].playerName
        );
        await updatePlayerList(players);
      });
      // not needed at this time
      // socket.on("joined-room", async ({ localPlayer }) => {
      //   console.log("[SOCKET]: joining: ", localPlayer);
      //   await updateSession({ inGameSession: true });
      //   await setLocalPlayer(localPlayer);
      // });
      return () => socket.disconnect();
    }
  }, [
    session.initialized,
    updateSession,
    fetchPlayerList,
    removePlayer,
    setLocalPlayer,
    updateLocalPlayer,
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
