/* IMPORTS */
import React, { useEffect, useState } from "react";
import { useEmitterStore, useSessionStore } from "../../store/store";
import { PlayerPage } from "../../pages";
import socket from "../../config/socket";
import history from "../../config/history";
/* ------ */

// TODO:
//  make this a modal on the game page when first loaded
//  while this is up show skeleton gifs then load them when the player finishes the form

export const PlayerModal = () => {
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
  const joinSessionEmitter = useEmitterStore(
    (state) => state.joinSessionEmitter
  );
  const [playerName, setPlayerName] = useState("");

  const handleNameChange = (e) => setPlayerName(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await toggleFetchFromGiphy(true);
    await joinSessionEmitter(playerName, roomId);
  };

  return (
    <div className="modal modal__player">
      <div className="modal__heading">Create your player</div>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input
          name="player-name"
          value={playerName}
          onChange={handleNameChange}
        />
        <button type="submit">Join Game</button>
      </form>
    </div>
  );
};
