/* IMPORTS */
import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import socket from "../../../../config/socket";
import { useSessionStore, useGiphyStore } from "../../../../store/store";
import { gf } from "../../../../config/giphySDK";
import { Sidebar } from "../../../../components/Sidebar";
import { GameContainer } from "../GameContainer";
import { giphyFetch } from "../../../../api/fetchFromGiphy";

/* ------ */

export const GameContext = () => {
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

  const [addGifToTable] = useGiphyStore((state) => [state.addGifToTable]);

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
      socket.on("player-joined",  (players) => {
        console.info("[IO]: player joined...", socket.playerName);
        updatePlayerList(players);
      });
      socket.on("add-gif", async ({ gifId }) => {
        console.info("[IO]: adding gif to table...", gifId);
        const [gif] = await giphyFetch(gf, "byId", null, gifId);
        addGifToTable(gif);
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
    addGifToTable,
  ]);
  return (
    <DndProvider debugMode={true} backend={HTML5Backend}>
      <Sidebar />
      <GameContainer />
    </DndProvider>
  );
};
