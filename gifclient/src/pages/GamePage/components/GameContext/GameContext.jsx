/* IMPORTS */
import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { giphyFetch } from "../../../../api/fetchFromGiphy";
import { gf } from "../../../../config/giphySDK";
import socket from "../../../../config/socket";
import { useSessionStore, useGiphyStore } from "../../../../store/store";
import { Sidebar } from "../../../../components/Sidebar";
import { GameContainer } from "../GameContainer";
/* ------ */

export const GameContext = () => {
  const [
    session,
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
    state.fetchFromGiphy,
    state.setLocalPlayer,
    state.updateLocalPlayer,
    state.fetchPlayerList,
    state.updatePlayerList,
    state.updateSession,
    state.removePlayer,
    state.toggleFetchFromGiphy,
  ]);

  const [giphyType, addGifToTable] = useGiphyStore((state) => [
    state.giphyType,
    state.addGifToTable,
  ]);

  useEffect(() => {
    socket.on("room-created", async (roomId) => {
      console.info("[IO]: created", roomId);
      updateSession({ roomId });
    });
    if (session.initialized) {
      // Session listeners
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
      socket.on("player-joined", (players, name) => {
        console.info("[IO]: player joined...", name);
        updatePlayerList(players);
      });
      socket.on("player-left", (playerId, name) => {
        console.info("[IO]: player left...", name);
        removePlayer(playerId);
      });
      // Giphy listeners
      socket.on("add-gif", async (gifId) => {
        console.info("[IO]: adding gif to table...", gifId);
        const [gif] = await giphyFetch(gf, giphyType, "byId", null, gifId);
        addGifToTable(gif);
      });
    }
    return function cleanup() {
      socket.disconnect();
    };
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
    addGifToTable,
  ]);
  return (
    <>
      <Sidebar />
      <GameContainer />
    </>
  );
};
