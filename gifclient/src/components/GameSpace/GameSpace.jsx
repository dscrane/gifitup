import React, { useEffect, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { GameTable } from "../GameTable";
import { GameHand } from "../GameHand";

import { fetchFromGiphy } from "../../api/fetchFromGiphy";

const GameSpace = () => {
  const gf = new GiphyFetch("ENiNvfm90KcAX4An2sM8ajbvtg3R6v18");

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="gamespace__table">
        <GameTable gf={gf} />
      </div>
      <div className="gamespace__hand">
        <GameHand />
      </div>
    </DndProvider>
  );
};

export default GameSpace;
