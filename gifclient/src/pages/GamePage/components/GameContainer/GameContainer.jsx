import React from "react";
import { usePlayerStore } from "../../../../store/store";
import { GameTable } from "../GameTable";
import { GameHand } from "../GameHand";

export const GameContainer = () => {
  const [localPlayer] = usePlayerStore((state) => [state.localPlayer]);

  return (
    <div className="game">
      <GameTable />
      {localPlayer ? (
        <GameHand localPlayer={localPlayer} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
