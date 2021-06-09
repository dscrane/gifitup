import React, { useState } from "react";
import { useStore } from "../store/store";

export const LandingPage = () => {
  const [playerName, setPlayerName] = useState("");
  const [gameName, setGameName] = useState("");
  const [createGame, toggleCreateGame] = useState(true);
  const [initializeSession, createSessionRoom, joinSessionRoom] = useStore(
    (state) => [
      state.initializeSession,
      state.createSessionRoom,
      state.joinSessionRoom,
    ]
  );

  const handlePlayerChange = (e) => {
    setPlayerName(e.target.value);
  };
  const handleGameChange = (e) => {
    setGameName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await initializeSession();
    if (createGame) {
      await createSessionRoom(playerName);
    } else {
      await joinSessionRoom(playerName, gameName);
    }
  };

  const content = createGame ? (
    <>
      <div>
        <label>Name</label>
        <input
          name="new-player"
          value={playerName}
          onChange={handlePlayerChange}
        />
      </div>
    </>
  ) : (
    <>
      <label>Name</label>
      <input
        name="new-player"
        value={playerName}
        onChange={handlePlayerChange}
      />
      <label>Game Name</label>
      <input name="game-name" value={gameName} onChange={handleGameChange} />
    </>
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {content}
        <button type="submit">
          {createGame ? "Create Game" : "Join Game"}
        </button>
        {}
        <button type="button" onClick={() => toggleCreateGame(!createGame)}>
          {!createGame ? "Create Game" : "Join Game"}
        </button>
      </form>
    </div>
  );
};
