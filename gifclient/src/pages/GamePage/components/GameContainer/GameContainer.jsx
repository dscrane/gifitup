import React, { useEffect, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";

import { GameTable } from "../GameTable";
import { GameHand } from "../GameHand";

import { fetchFromGiphy } from "../../../../api/fetchFromGiphy";
import { useGiffyStore } from "../../../../store/store";

export const GameContainer = () => {
  const [setGiffySDK, updateSessionGifs] = useGiffyStore((state) => [
    state.setGiffySDK,
    state.updateSessionGifs,
  ]);
  useEffect(() => {
    const createGiffySession = async () => {
      const gf = new GiphyFetch("ENiNvfm90KcAX4An2sM8ajbvtg3R6v18");
      setGiffySDK(gf);
      const initialGifs = await fetchFromGiphy(gf, "memes", {
        sort: "relevant",
        limit: 50,
        offset: 0,
        rating: "r",
        type: "gifs",
        lang: "en",
      });
      await updateSessionGifs(initialGifs);
    };
    createGiffySession();
  }, []);

  return (
    <div className="app__gamespace">
      <div className="gamespace__table">{<GameTable />}</div>
      <div className="gamespace__hand">
        <GameHand />
      </div>
    </div>
  );
};
