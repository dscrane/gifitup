import React, { useState } from "react";
import { useEmitterStore, useSessionStore } from "../../store/store";

export const LandingPage = () => {
  const [gameId, setGameId] = useState("");
  const [initializeSession] = useSessionStore((state) => [
    state.initializeSession,
  ]);
  const [createSessionEmitter] = useEmitterStore((state) => [
    state.createSessionEmitter,
  ]);

  const handleGameIdChange = (e) => {
    setGameId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
