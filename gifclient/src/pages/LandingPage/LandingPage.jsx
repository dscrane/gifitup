import React, { useState } from "react";
import { useEmitterStore, useSessionStore } from "../../store/store";

export const LandingPage = () => {
  const [playerName, setPlayerName] = useState("");
  const [gameId, setGameId] = useState("");
  const [createGame, toggleCreateGame] = useState(true);
  const [session, updateSession, initializeSession] = useSessionStore(
    (state) => [state.session, state.updateSession, state.initializeSession]
  );
  const [createSessionEmitter, joinSessionEmitter] = useEmitterStore(
    (state) => [state.createSessionEmitter, state.joinSessionEmitter]
  );

  const handleGameIdChange = (e) => {
    setGameId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(gameId);
    await initializeSession(gameId);
  };

  const beginGame = async () => {
    await initializeSession();
    await createSessionEmitter();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Game Id</label>
        <input name="gameId" value={gameId} onChange={handleGameIdChange} />
        <button type="submit">Join Game</button>
      </form>
      <button type="button" onClick={() => beginGame()}>
        Create Game
      </button>
    </div>
  );
};
