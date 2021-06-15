import React, { useEffect, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";

import { GameTable } from "../GameTable";
import { GameHand } from "../GameHand";

import { fetchFromGiphy } from "../../../../api/fetchFromGiphy";
import { useGiffyStore } from "../../../../store/store";

export const GameContainer = ({ thisPlayer }) => {
  const [sessionGifs, setGiffySDK, updateSessionGifs] = useGiffyStore(
    (state) => [state.sessionGifs, state.setGiffySDK, state.updateSessionGifs]
  );
  useEffect(() => {
    const createGiffySession = async () => {
      console.log(thisPlayer);
      const gf = new GiphyFetch("ENiNvfm90KcAX4An2sM8ajbvtg3R6v18");
      setGiffySDK(gf);
      let params;
      if (thisPlayer.queryOffset) {
        params = {
          sort: "relevant",
          limit: 7,
          offset: thisPlayer.queryOffset || 0,
          rating: "r",
          type: "gifs",
          lang: "en",
        };
      } else if (thisPlayer.isHost) {
        params = {
          sort: "relevant",
          limit: 7,
          offset: 0,
          rating: "r",
          type: "gifs",
          lang: "en",
        };
      }

      const initialGifs = await fetchFromGiphy(gf, "memes", "memes", params);
      await updateSessionGifs(initialGifs);
    };
    createGiffySession();
  }, [thisPlayer.queryOffset]);

  return (
    <div className="game">
      <GameTable />
      <GameHand />
    </div>
  );
};
