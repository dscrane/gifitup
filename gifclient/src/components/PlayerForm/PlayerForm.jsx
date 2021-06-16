/* IMPORTS */
import React, { useState } from "react";
import { useEmitterStore, useSessionStore } from "../../store/store";
/* ------ */

export const PlayerForm = () => {
  const [session, toggleFetchFromGiphy] = useSessionStore((state) => [
    state.session,
    state.toggleFetchFromGiphy,
  ]);
  const joinSessionEmitter = useEmitterStore(
    (state) => state.joinSessionEmitter
  );
  const [playerName, setPlayerName] = useState("");

  const handleNameChange = (e) => setPlayerName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(playerName);
    joinSessionEmitter(playerName, session.roomId);
    toggleFetchFromGiphy(true);
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
