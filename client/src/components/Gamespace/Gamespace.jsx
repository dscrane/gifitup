import React from "react";
import { GameTable } from "../GameTable";
import { GameHand } from "../GameHand";

const Gamespace = () => {
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

export default Gamespace;
