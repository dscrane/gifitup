/* IMPORTS */
import React, { useEffect, useState } from "react";
import { useEmitterStore, useSessionStore } from "../../store/store";
import socket from "../../config/socket";
import history from "../../config/history";
/* ------ */

export const PlayerPage = () => {
  const [session, toggleFetchFromGiphy, updateSession] = useSessionStore(
    (state) => [state.session, state.toggleFetchFromGiphy, state.updateSession]
  );
  const joinSessionEmitter = useEmitterStore(
    (state) => state.joinSessionEmitter
  );
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    if (session.roomId) {
      updateSession({ roomId: session.roomId });
    } else {
      socket.on("room-created", async (roomId) => {
        console.info("[IO]: created", roomId);
        updateSession({ roomId });
      });
    }
  }, [updateSession]);

  const handleNameChange = (e) => setPlayerName(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await toggleFetchFromGiphy(true);
    await joinSessionEmitter(playerName, session.roomId);
    history.push(`games/${session.roomId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name: </label>
      <input
        name="player-name"
        value={playerName}
        onChange={handleNameChange}
      />
      <button type="submit">Join Game</button>
    </form>
  );
};
