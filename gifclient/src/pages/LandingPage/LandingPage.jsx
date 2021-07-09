import React, { useState } from "react";
import { useEmitterStore, useSessionStore } from "../../store/store";
import history from "../../config/history";

export const LandingPage = (props) => {
  const [gameId, setGameId] = useState();
  const [initializeSession] = useSessionStore((state) => [
    state.initializeSession,
  ]);
  const [createSessionEmitter, fetchPlayersEmitter] = useEmitterStore(
    (state) => [state.createSessionEmitter, state.fetchPlayersEmitter]
  );

  const handleGameIdChange = (e) => {
    setGameId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (props.match) {
      await initializeSession(props.match.params.id);
      await fetchPlayersEmitter(props.match.params.id);
    }
  };

  const beginGame = async () => {
    await initializeSession();
    await createSessionEmitter();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Game Id</label>
        <input
          name="gameId"
          value={props.match ? props.match.params.id : ""}
          onChange={handleGameIdChange}
        />
        <button type="submit">Join Game</button>
      </form>
      <button type="button" onClick={() => beginGame()}>
        Create Game
      </button>
    </div>
  );
};
