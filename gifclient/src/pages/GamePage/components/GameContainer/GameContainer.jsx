import React, { useEffect, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";

import { GameTable } from "../GameTable";
import { GameHand } from "../GameHand";

import { fetchFromGiphy } from "../../../../api/fetchFromGiphy";
import { useGiffyStore, useSessionStore } from "../../../../store/store";

export const GameContainer = () => {
  const [thisPlayer] = useSessionStore((state) => [state.thisPlayer]);
  const [sessionGifs, setGiffySDK, updateSessionGifs] = useGiffyStore(
    (state) => [state.sessionGifs, state.setGiffySDK, state.updateSessionGifs]
  );
  useEffect(() => {
    const createGiffySession = async () => {
      const gf = new GiphyFetch("ENiNvfm90KcAX4An2sM8ajbvtg3R6v18");
      setGiffySDK(gf);
      const initialGifs = await fetchFromGiphy(gf, "memes", "memes", {
        sort: "relevant",
        limit: 7,
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
    <div className="game">
      <GameTable />
      <GameHand />
    </div>
  );
};
