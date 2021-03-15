import React from "react";
import { GameTable } from "../GameTable";
import { GameHand } from "../GameHand";

const GameSpace = () => {
  return (
    <>
      <div className="gamespace__table">
        <GameTable />
      </div>
      <div className="gamespace__hand">
        <GameHand />
      </div>
    </>
  );
};

export default GameSpace;
