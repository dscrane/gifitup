import React, { useEffect, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";

import { GameTable } from "../GameTable";
import { GameHand } from "../GameHand";

import { fetchFromGiphy } from "../../../../api/fetchFromGiphy";

export const GameContainer = () => {
  // const gf = new GiphyFetch("ENiNvfm90KcAX4An2sM8ajbvtg3R6v18");

  return (
    <>
      <div className="gamespace__table">{/*<GameTable gf={gf} />*/}</div>
      <div className="gamespace__hand">
        <GameHand />
      </div>
    </>
  );
};
