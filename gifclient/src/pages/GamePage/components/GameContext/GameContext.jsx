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
import { log } from "../../../../utils/logs";
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
      log.io(`%c[IO_on]: %croom-created %c${roomId}`);
      updateSession(
        {
          roomId,
          shareURL: `http://localhost:3000/join/${roomId}`,
        },
        "room-created"
      );
      history.push(`games/sid/${roomId}`);
    });
    // Player listeners
    socket.on("set-local-player", (localPlayer) => {
      log.io(`%c[IO_on]: %cset-local-player %c${localPlayer.playerName}`);
      setLocalPlayer(localPlayer, "set-local-player");
      updateSession({ isStarted: true }, "set-local-player");
    });
    socket.on("update-local-player", (localPlayer) => {
      log.io(`%c[IO_on]: %cupdate-local-player %c${localPlayer.playerName}`);
      updateLocalPlayer(localPlayer, "update-local-player");
    });
    socket.on("player-list", (players) => {
      log.io("%c[IO_on]: %cplayer-list%c", players);
      updatePlayerList(players, "player-list");
    });
    socket.on("player-joined", (players) => {
      log.io("%c[IO_on]: %cplayer-joined%c", players);
      updatePlayerList(players, "player-joined");
    });
    socket.on("player-left", (playerId, name) => {
      log.io(`%c[IO_on]: %cplayer-left%c${name}`);
      removePlayer(playerId);
    });
    socket.on("player-is-not-judge", (isJudge) => {
      log.io("%c[IO_on]: %cplayer-is-not-judge%c", isJudge);
      updateLocalPlayer(isJudge);
    });
    socket.on("player-is-judge", (nextJudge) => {
      log.io("%c[IO_on]: %cplayer-is-judge%c", nextJudge);
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
      const [gif] = await giphyFetch(gf, giphyType, "byId", null, gifId);
      log.io(`%c[IO_on]: %cadd-gif %c${gifId}`);
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
