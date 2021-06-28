/* IMPORTS */
import React, { useEffect, useState } from "react";
import { useEmitterStore, useSessionStore } from "../../store/store";
import socket from "../../config/socket";
import history from "../../config/history";
/* ------ */

// TODO:
//  make this a modal on the game page when first loaded
//  while this is up show skeleton gifs then load them when the player finishes the form

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
        updateSession({
          roomId,
          shareURL: `http://localhost:3000/join/${roomId}`,
        });
      });
    }
  }, [updateSession]);

  const handleNameChange = (e) => setPlayerName(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(session.roomId);
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
