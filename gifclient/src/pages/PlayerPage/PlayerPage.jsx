/* IMPORTS */
import React, { useEffect, useState } from "react";
import { useEmitterStore, useSessionStore } from "../../store/store";
import socket from "../../config/socket";
import history from "../../config/history";
/* ------ */

export const PlayerPage = () => {
  /*  const [roomId, toggleFetchFromGiphy, updateSession] = useSessionStore(
    (state) => [state.roomId, state.toggleFetchFromGiphy, state.updateSession]
  );
  const joinSessionEmitter = useEmitterStore(
    (state) => state.joinSessionEmitter
  );
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    if (roomId) {
      updateSession({ roomId });
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

  const handleNameChange = (e) => setPlayerName(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(roomId);
    await toggleFetchFromGiphy(true);
    await joinSessionEmitter(playerName, roomId);
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
  );*/
};
