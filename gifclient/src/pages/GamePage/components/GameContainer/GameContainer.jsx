import React, { useEffect } from "react";
import { usePlayerStore, useSessionStore } from "../../../../store/store";
import { GameTable } from "../GameTable";
import { GameHand } from "../GameHand";
import { PlayerModal } from "../../../../components/PlayerModal";
import history from "../../../../config/history";
import socket from "../../../../config/socket";

export const GameContainer = () => {
  const [localPlayer] = usePlayerStore((state) => [state.localPlayer]);
  const [
    roomId,
    displayPlayerModal,
    togglePlayerModal,
    toggleFetchFromGiphy,
    updateSession,
  ] = useSessionStore((state) => [
    state.roomId,
    state.displayPlayerModal,
    state.togglePlayerModal,
    state.toggleFetchFromGiphy,
    state.updateSession,
  ]);

  useEffect(() => {
    if (roomId) {
      updateSession({ roomId });
      history.push(`games/${roomId}`);
    } else {
      socket.on("room-created", async (roomId) => {
        console.info("[IO]: created", roomId);
        updateSession({
          roomId,
          shareURL: `http://localhost:3000/join/${roomId}`,
        });
        history.push(`games/${roomId}`);
      });
    }
  }, [updateSession]);

  const handDisplay = localPlayer ? (
    <GameHand localPlayer={localPlayer} />
  ) : (
    <div>Loading...</div>
  );

  const tableDisplay =
    !localPlayer && displayPlayerModal ? <PlayerModal /> : <GameTable />;

  return (
    <div className="game">
      <div className="game__table">{tableDisplay}</div>
      <div className="game__hand">{handDisplay}</div>
    </div>
  );
};
