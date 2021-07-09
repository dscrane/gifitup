/* IMPORTS */
import React, { useEffect } from "react";
import history from "../../../../config/history";
import {
  useSessionStore,
  useGiphyStore,
  usePlayerStore,
} from "../../../../store/store";
import { gf } from "../../../../config/giphySDK";
import socket from "../../../../config/socket";
import { giphyFetch } from "../../../../api/fetchFromGiphy";
import { Sidebar } from "../../../../components/Sidebar";
import { GameContainer } from "../GameContainer";
/* ------ */

export const GameContext = () => {
  const [
    localPlayer,
    setLocalPlayer,
    updateLocalPlayer,
    updatePlayerList,
    addPlayerToList,
    removePlayer,
  ] = usePlayerStore((state) => [
    state.localPlayer,
    state.setLocalPlayer,
    state.updateLocalPlayer,
    state.updatePlayerList,
    state.addPlayerToList,
    state.removePlayer,
  ]);
  const [fetchFromGiphy, toggleFetchFromGiphy, updateSession] = useSessionStore(
    (state) => [
      state.fetchFromGiphy,
      state.toggleFetchFromGiphy,
      state.updateSession,
    ]
  );
  const [giphyType, addGifToTable] = useGiphyStore((state) => [
    state.giphyType,
    state.addGifToTable,
  ]);

  useEffect(() => {
    socket.on("room-created", (roomId) => {
      console.info("[IO]: created", roomId);
      updateSession({
        roomId,
        shareURL: `http://localhost:3000/join/${roomId}`,
      });
      history.push(`games/sid/${roomId}`);
    });
    // Player listeners
    socket.on("set-local-player", (localPlayer) => {
      console.info("[IO]: local player...", localPlayer);
      setLocalPlayer(localPlayer);
      updateSession({ isStarted: true });
    });
    socket.on("update-local-player", (localPlayer) => {
      console.info("[IO]: updated local player...", localPlayer.playerName);
      updateLocalPlayer(localPlayer);
    });
    socket.on("player-list", (players) => {
      console.info("[IO]: current players...", players);
      updatePlayerList(players);
    });
    socket.on("player-joined", (players) => {
      console.info("[IO]: player joined...", players);
      updatePlayerList(players);
    });
    socket.on("player-left", (playerId, name) => {
      console.info("[IO]: player left...", name);
      removePlayer(playerId);
    });
    socket.on("player-is-not-judge", (isJudge) => {
      console.info("[IO]: player is now judge...", isJudge);
      updateLocalPlayer(isJudge);
    });
    socket.on("player-is-judge", (nextJudge) => {
      console.info("[IO]: player is judge...", nextJudge);
      // console.log(localPlayer);
      if (localPlayer) {
        updateLocalPlayer(
          localPlayer.playerId === nextJudge
            ? { isJudge: true }
            : { isJudge: false }
        );
      }
    });
    socket.on("next-round", (nextJudgeId) => {
      // increment point for round winner
      // pass judge role
      // lock judge's hand
      // pull new center card
      // reset round timer
      // hide judgement modal
      // remove table gifs
    });
    // Giphy listeners
    socket.on("add-gif", async (gifId) => {
      console.info("[IO]: adding gif to table...", gifId);
      const [gif] = await giphyFetch(gf, giphyType, "byId", null, gifId);
      addGifToTable(gif);
    });
  }, [
    // localPlayer,
    //   removePlayer,
    setLocalPlayer,
    updateSession,
    //   addPlayerToList,
    //   updateLocalPlayer,
    //   updatePlayerList,
    //   toggleFetchFromGiphy,
    //   fetchFromGiphy,
    //   addGifToTable,
  ]);
  return (
    <>
      <Sidebar />
      <GameContainer />
    </>
  );
};
